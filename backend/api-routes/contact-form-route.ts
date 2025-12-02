/**
 * Contact Form API Route
 * Next.js App Router - Server Actions
 *
 * Handles contact form submissions with:
 * - Form validation
 * - Email notifications
 * - CRM integration (optional)
 * - Rate limiting
 * - Spam protection
 */

import { z } from "zod";
import { Resend } from "resend";

// Initialize email service (using Resend - you can swap for SendGrid, Postmark, etc.)
const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const contactFormSchema = z.object({
  // Personal Information
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  organization: z.string().min(2).max(200),

  // Organization Details
  organizationType: z.enum([
    "nonprofit-education",
    "nonprofit-health",
    "nonprofit-justice",
    "nonprofit-environment",
    "nonprofit-arts",
    "nonprofit-other",
    "corporate-tech",
    "corporate-finance",
    "corporate-healthcare",
    "corporate-other",
    "government",
    "foundation",
    "individual",
    "other",
  ]),
  organizationSize: z
    .enum([
      "small", // 1-10
      "medium", // 11-50
      "large", // 51-200
      "enterprise", // 201+
    ])
    .optional(),

  // Project Details
  projectType: z.array(z.string()).min(1, "Select at least one service"),
  projectDescription: z
    .string()
    .min(50, "Please provide more detail about your project")
    .max(2000),
  goals: z.string().max(1000).optional(),

  // Timeline & Budget
  timeline: z.enum([
    "urgent", // < 1 month
    "soon", // 1-3 months
    "flexible", // 3-6 months
    "planning", // 6+ months
  ]),
  budget: z
    .enum([
      "under-10k",
      "10k-25k",
      "25k-50k",
      "50k-100k",
      "over-100k",
      "not-sure",
    ])
    .optional(),

  // Additional Info
  referralSource: z.string().optional(),
  additionalInfo: z.string().max(1000).optional(),

  // Consent
  marketingConsent: z.boolean().default(false),

  // Honeypot (spam prevention)
  _honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================================
// SERVER ACTION: Submit Contact Form
// ============================================================================

export async function submitContactForm(formData: ContactFormData) {
  "use server";

  try {
    // 1. Validate form data
    const validatedData = contactFormSchema.parse(formData);

    // 2. Check honeypot (spam protection)
    if (validatedData._honeypot) {
      // This is likely spam - silently reject
      return {
        success: false,
        error: "Invalid submission",
      };
    }

    // 3. Rate limiting check (implement with Upstash Redis or similar)
    const rateLimitOk = await checkRateLimit(validatedData.email);
    if (!rateLimitOk) {
      return {
        success: false,
        error: "Too many requests. Please try again later.",
      };
    }

    // 4. Send notification emails
    await Promise.all([
      sendClientConfirmationEmail(validatedData),
      sendInternalNotificationEmail(validatedData),
    ]);

    // 5. Save to database/CRM (optional)
    await saveToDatabase(validatedData);

    // 6. Optional: Add to CRM (HubSpot, Salesforce, etc.)
    // await addToCRM(validatedData)

    return {
      success: true,
      message: "Thank you for reaching out! We'll be in touch within 24 hours.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Please check your form and try again.",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    console.error("Contact form error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again or email us directly.",
    };
  }
}

// ============================================================================
// EMAIL FUNCTIONS
// ============================================================================

/**
 * Send confirmation email to the person who submitted the form
 */
async function sendClientConfirmationEmail(data: ContactFormData) {
  const { name, email, organization } = data;

  await resend.emails.send({
    from: "Equity by Design <hello@equitybydesign.com>",
    to: email,
    subject: "We received your inquiry - Equity by Design",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E07A5F; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #F4F1DE; padding: 30px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
            a { color: #3D5A80; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${name}!</h1>
            </div>
            <div class="content">
              <p>We've received your inquiry about working with Equity by Design for ${organization}.</p>

              <p>Our team is reviewing your project details and will reach out within 24 hours to discuss next steps.</p>

              <p>In the meantime, feel free to:</p>
              <ul>
                <li><a href="https://equitybydesign.com/work">Explore our case studies</a></li>
                <li><a href="https://equitybydesign.com/insights">Read our latest insights</a></li>
                <li><a href="https://equitybydesign.com/about">Learn more about our team</a></li>
              </ul>

              <p>If you have any immediate questions, reply to this email or call us at (555) 123-4567.</p>

              <p>Looking forward to creating change together!</p>

              <p><strong>The Equity by Design Team</strong></p>
            </div>
            <div class="footer">
              <p>Equity by Design | Design for Everyone</p>
              <p><a href="https://equitybydesign.com">equitybydesign.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

/**
 * Send notification email to internal team
 */
async function sendInternalNotificationEmail(data: ContactFormData) {
  const {
    name,
    email,
    phone,
    organization,
    organizationType,
    projectType,
    projectDescription,
    timeline,
    budget,
  } = data;

  await resend.emails.send({
    from: "Contact Form <notifications@equitybydesign.com>",
    to: process.env.INTERNAL_NOTIFICATION_EMAIL || "team@equitybydesign.com",
    subject: `🎯 New Project Inquiry: ${organization}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: monospace; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .section { background: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #E07A5F; }
            .label { font-weight: bold; color: #3D5A80; }
            .priority-${data.timeline} { border-left-color: ${
      data.timeline === "urgent"
        ? "#FF6B6B"
        : data.timeline === "soon"
        ? "#FFA500"
        : "#81B29A"
    }; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎯 New Project Inquiry</h1>

            <div class="section">
              <h2>Contact Information</h2>
              <p><span class="label">Name:</span> ${name}</p>
              <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
              ${
                phone ? `<p><span class="label">Phone:</span> ${phone}</p>` : ""
              }
              <p><span class="label">Organization:</span> ${organization}</p>
              <p><span class="label">Type:</span> ${organizationType}</p>
            </div>

            <div class="section priority-${timeline}">
              <h2>Project Details</h2>
              <p><span class="label">Services Requested:</span> ${projectType.join(
                ", "
              )}</p>
              <p><span class="label">Timeline:</span> ${timeline.toUpperCase()}</p>
              ${
                budget
                  ? `<p><span class="label">Budget:</span> ${budget}</p>`
                  : ""
              }
              <p><span class="label">Description:</span></p>
              <p>${projectDescription}</p>
            </div>

            <div class="section">
              <h2>Next Steps</h2>
              <ol>
                <li>Review project details and assess fit</li>
                <li>Check team availability</li>
                <li>Respond within 24 hours</li>
                <li>Schedule discovery call if appropriate</li>
              </ol>
            </div>

            <p style="margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Your Equity by Design inquiry"
                 style="background: #E07A5F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reply to ${name}
              </a>
            </p>
          </div>
        </body>
      </html>
    `,
  });
}

// ============================================================================
// DATABASE FUNCTIONS
// ============================================================================

/**
 * Save contact form submission to database
 * (Using Sanity as example - could be PostgreSQL, MongoDB, etc.)
 */
async function saveToDatabase(data: ContactFormData) {
  const { createClient } = await import("@sanity/client");

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  });

  await client.create({
    _type: "contactSubmission",
    submittedAt: new Date().toISOString(),
    status: "new",
    ...data,
  });
}

// ============================================================================
// RATE LIMITING
// ============================================================================

/**
 * Check rate limit for email address
 * Prevents spam by limiting submissions per email/IP
 */
async function checkRateLimit(email: string): Promise<boolean> {
  // Implement with Upstash Redis, Vercel KV, or similar
  // For now, returning true (no rate limiting)
  //
  // Example implementation:
  // const redis = new Redis(process.env.UPSTASH_REDIS_URL)
  // const key = `contact-form:${email}`
  // const submissions = await redis.incr(key)
  // if (submissions === 1) {
  //   await redis.expire(key, 3600) // 1 hour window
  // }
  // return submissions <= 3 // Max 3 submissions per hour

  return true;
}

// ============================================================================
// ROUTE HANDLER: POST /api/contact-us
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitContactForm(body);

    if (result.success) {
      return Response.json(result, { status: 200 });
    } else {
      return Response.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("Contact form API error:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
