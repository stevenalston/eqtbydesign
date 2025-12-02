/**
 * Newsletter Subscription API Route
 * Next.js App Router - Server Actions
 *
 * Handles newsletter subscriptions with:
 * - Email validation
 * - Double opt-in workflow
 * - Integration with email marketing platforms
 * - GDPR compliance
 */

import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const newsletterSubscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().max(50).optional(),
  interests: z.array(z.string()).optional(),
  source: z.string().optional(), // Where they signed up from
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to receive emails',
  }),
  _honeypot: z.string().max(0).optional(), // Spam protection
})

export type NewsletterSubscribeData = z.infer<typeof newsletterSubscribeSchema>

const newsletterUnsubscribeSchema = z.object({
  email: z.string().email(),
  token: z.string().optional(), // Unsubscribe token for verification
})

// ============================================================================
// SERVER ACTIONS
// ============================================================================

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(data: NewsletterSubscribeData) {
  'use server'

  try {
    // 1. Validate data
    const validatedData = newsletterSubscribeSchema.parse(data)

    // 2. Check honeypot
    if (validatedData._honeypot) {
      return {
        success: false,
        error: 'Invalid submission',
      }
    }

    // 3. Check if already subscribed
    const existingSubscriber = await getSubscriber(validatedData.email)
    if (existingSubscriber?.status === 'active') {
      return {
        success: true,
        message: 'You\'re already subscribed! Check your inbox for our latest updates.',
        alreadySubscribed: true,
      }
    }

    // 4. Generate confirmation token
    const confirmationToken = await generateConfirmationToken(validatedData.email)

    // 5. Add to email marketing platform (ConvertKit, Mailchimp, etc.)
    await addToEmailPlatform(validatedData, confirmationToken)

    // 6. Send double opt-in confirmation email
    await sendConfirmationEmail(validatedData.email, confirmationToken)

    // 7. Save to database with pending status
    await saveSubscriber({
      ...validatedData,
      status: 'pending',
      subscribedAt: new Date().toISOString(),
      confirmationToken,
    })

    return {
      success: true,
      message: 'Almost there! Please check your email to confirm your subscription.',
      requiresConfirmation: true,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Please check your information and try again.',
        fieldErrors: error.flatten().fieldErrors,
      }
    }

    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}

/**
 * Confirm newsletter subscription (from email link)
 */
export async function confirmNewsletterSubscription(token: string) {
  'use server'

  try {
    // 1. Verify token and get email
    const email = await verifyConfirmationToken(token)
    if (!email) {
      return {
        success: false,
        error: 'Invalid or expired confirmation link.',
      }
    }

    // 2. Update subscriber status
    await updateSubscriberStatus(email, 'active')

    // 3. Update email platform
    await updateEmailPlatformStatus(email, 'active')

    // 4. Send welcome email
    await sendWelcomeEmail(email)

    return {
      success: true,
      message: 'Welcome! Your subscription is confirmed.',
    }
  } catch (error) {
    console.error('Newsletter confirmation error:', error)
    return {
      success: false,
      error: 'Failed to confirm subscription. Please try again.',
    }
  }
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribeFromNewsletter(
  data: z.infer<typeof newsletterUnsubscribeSchema>
) {
  'use server'

  try {
    const validatedData = newsletterUnsubscribeSchema.parse(data)

    // 1. Verify unsubscribe token if provided
    if (validatedData.token) {
      const isValid = await verifyUnsubscribeToken(
        validatedData.email,
        validatedData.token
      )
      if (!isValid) {
        return {
          success: false,
          error: 'Invalid unsubscribe link.',
        }
      }
    }

    // 2. Update subscriber status
    await updateSubscriberStatus(validatedData.email, 'unsubscribed')

    // 3. Remove from email platform
    await removeFromEmailPlatform(validatedData.email)

    // 4. Send confirmation email
    await sendUnsubscribeConfirmationEmail(validatedData.email)

    return {
      success: true,
      message: 'You\'ve been unsubscribed. We\'re sorry to see you go!',
    }
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return {
      success: false,
      error: 'Failed to unsubscribe. Please try again.',
    }
  }
}

/**
 * Update newsletter preferences
 */
export async function updateNewsletterPreferences(
  email: string,
  preferences: {
    interests?: string[]
    frequency?: 'weekly' | 'biweekly' | 'monthly'
  }
) {
  'use server'

  try {
    await updateSubscriber(email, preferences)
    await updateEmailPlatformPreferences(email, preferences)

    return {
      success: true,
      message: 'Your preferences have been updated.',
    }
  } catch (error) {
    console.error('Newsletter preferences error:', error)
    return {
      success: false,
      error: 'Failed to update preferences.',
    }
  }
}

// ============================================================================
// EMAIL FUNCTIONS
// ============================================================================

/**
 * Send double opt-in confirmation email
 */
async function sendConfirmationEmail(email: string, token: string) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/confirm?token=${token}`

  await resend.emails.send({
    from: 'Equity by Design <hello@equitybydesign.com>',
    to: email,
    subject: 'Confirm your subscription to Equity by Design',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { background: #E07A5F; color: white; padding: 16px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; }
            .footer { margin-top: 40px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to Equity by Design!</h1>

            <p>Thanks for subscribing to our newsletter. We're excited to share insights on design, equity, and social impact with you.</p>

            <p>Please confirm your email address to complete your subscription:</p>

            <p style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" class="button">Confirm Subscription</a>
            </p>

            <p style="font-size: 14px; color: #666;">
              Or copy and paste this link into your browser:<br>
              ${confirmUrl}
            </p>

            <div class="footer">
              <p>If you didn't sign up for this newsletter, you can safely ignore this email.</p>
              <p>Equity by Design | Design for Everyone</p>
            </div>
          </div>
        </body>
      </html>
    `,
  })
}

/**
 * Send welcome email after confirmation
 */
async function sendWelcomeEmail(email: string) {
  await resend.emails.send({
    from: 'Equity by Design <hello@equitybydesign.com>',
    to: email,
    subject: '🎉 Welcome to the Equity by Design community!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .card { background: #F4F1DE; padding: 20px; margin: 15px 0; border-radius: 8px; }
            a { color: #3D5A80; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 You're in!</h1>

            <p>Welcome to the Equity by Design community! You'll now receive our insights on design for equity, social impact, and creating meaningful change.</p>

            <div class="card">
              <h3>What to expect:</h3>
              <ul>
                <li>📚 <strong>Weekly insights</strong> on equity-centered design</li>
                <li>🎨 <strong>Case studies</strong> showing real-world impact</li>
                <li>💡 <strong>Practical tips</strong> for creating inclusive experiences</li>
                <li>🌟 <strong>Exclusive content</strong> and early access to resources</li>
              </ul>
            </div>

            <h3>While you wait for our next newsletter:</h3>
            <ul>
              <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/work">Explore our case studies</a></li>
              <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/insights">Read our latest articles</a></li>
              <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/about">Meet our team</a></li>
            </ul>

            <p>Have questions or feedback? Just reply to this email—we'd love to hear from you!</p>

            <p><strong>The Equity by Design Team</strong></p>

            <p style="margin-top: 40px; font-size: 12px; color: #666;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/preferences?email=${email}">Update preferences</a> |
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?email=${email}">Unsubscribe</a>
            </p>
          </div>
        </body>
      </html>
    `,
  })
}

/**
 * Send unsubscribe confirmation
 */
async function sendUnsubscribeConfirmationEmail(email: string) {
  await resend.emails.send({
    from: 'Equity by Design <hello@equitybydesign.com>',
    to: email,
    subject: 'You\'ve been unsubscribed',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>You've been unsubscribed</h2>
          <p>We're sorry to see you go! You've been removed from our mailing list.</p>
          <p>If this was a mistake, you can <a href="${process.env.NEXT_PUBLIC_SITE_URL}/newsletter">resubscribe anytime</a>.</p>
          <p>Thanks for being part of our community!</p>
        </body>
      </html>
    `,
  })
}

// ============================================================================
// DATABASE FUNCTIONS
// ============================================================================

async function saveSubscriber(data: any) {
  const { createClient } = await import('@sanity/client')

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  })

  await client.create({
    _type: 'newsletterSubscriber',
    ...data,
  })
}

async function getSubscriber(email: string) {
  const { createClient } = await import('@sanity/client')

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  })

  const query = `*[_type == "newsletterSubscriber" && email == $email][0]`
  return client.fetch(query, { email })
}

async function updateSubscriberStatus(email: string, status: string) {
  const { createClient } = await import('@sanity/client')

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  })

  const subscriber = await getSubscriber(email)
  if (subscriber) {
    await client.patch(subscriber._id).set({ status }).commit()
  }
}

async function updateSubscriber(email: string, updates: any) {
  const { createClient } = await import('@sanity/client')

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  })

  const subscriber = await getSubscriber(email)
  if (subscriber) {
    await client.patch(subscriber._id).set(updates).commit()
  }
}

// ============================================================================
// EMAIL PLATFORM INTEGRATION (ConvertKit example)
// ============================================================================

async function addToEmailPlatform(data: NewsletterSubscribeData, token: string) {
  // Example: ConvertKit API
  // Replace with your email platform of choice
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    console.warn('ConvertKit not configured, skipping...')
    return
  }

  await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: CONVERTKIT_API_KEY,
      email: data.email,
      first_name: data.firstName,
      fields: {
        interests: data.interests?.join(','),
        source: data.source,
      },
    }),
  })
}

async function updateEmailPlatformStatus(email: string, status: string) {
  // Implement based on your email platform
}

async function updateEmailPlatformPreferences(email: string, preferences: any) {
  // Implement based on your email platform
}

async function removeFromEmailPlatform(email: string) {
  // Implement based on your email platform
}

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

async function generateConfirmationToken(email: string): Promise<string> {
  const crypto = await import('crypto')
  return crypto
    .createHash('sha256')
    .update(`${email}:${Date.now()}:${process.env.CONFIRMATION_SECRET}`)
    .digest('hex')
}

async function verifyConfirmationToken(token: string): Promise<string | null> {
  // Implement token verification logic
  // For now, returning null
  return null
}

async function verifyUnsubscribeToken(email: string, token: string): Promise<boolean> {
  // Implement token verification logic
  return true
}

// ============================================================================
// ROUTE HANDLERS
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await subscribeToNewsletter(body)

    return Response.json(result, {
      status: result.success ? 200 : 400,
    })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
