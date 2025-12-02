# Complete Implementation Guide

## Equity by Design - Backend & CMS Setup

This comprehensive guide will walk you through setting up the entire backend infrastructure for the Equity by Design website, from scratch to production deployment.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [Importing Sample Data](#importing-sample-data)
5. [Next.js Integration](#nextjs-integration)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Training Non-Technical Users](#training-non-technical-users)
9. [Ongoing Maintenance](#ongoing-maintenance)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js** 18.17+ and npm/yarn
- **Git** for version control
- **Code editor** (VS Code recommended)

### Required Accounts

- **Sanity.io account** (free tier is fine)
- **Vercel account** (for hosting - free tier available)
- **Resend account** (for transactional emails - free tier: 3K emails/month)
- **ConvertKit account** (optional - for newsletter)

### Knowledge Requirements

**For Developers:**

- Basic Next.js/React knowledge
- Understanding of headless CMS concepts
- Git/GitHub workflows

**For Content Editors:**

- No technical knowledge required!
- Basic computer skills (file upload, form filling)
- Web browser access

---

## Quick Start

**Get up and running in 30 minutes:**

```bash
# 1. Install Sanity CLI
npm install -g @sanity/cli

# 2. Login to Sanity
sanity login

# 3. Create new Sanity project
sanity init

# Follow prompts:
# - Project name: "Equity by Design"
# - Use schema: "Clean project with no predefined schemas"
# - Dataset: "production"

# 4. Copy schemas to your project
# Copy files from backend/schemas/ to your-sanity-project/schemas/

# 5. Deploy Sanity Studio
sanity deploy

# 6. Invite team members
sanity users invite team@equitybydesign.com --role editor

# 7. Start local development
sanity start
```

**Your Sanity Studio is now running at `http://localhost:3333`!**

---

## Detailed Setup

### Step 1: Sanity Project Initialization

#### 1.1 Install Sanity CLI

```bash
npm install -g @sanity/cli

# Verify installation
sanity --version
```

#### 1.2 Login to Sanity

```bash
sanity login

# This will open a browser for authentication
# Sign in with Google (recommended) or GitHub
```

#### 1.3 Create New Project

```bash
# Navigate to where you want your Sanity project
mkdir equity-by-design-cms
cd equity-by-design-cms

# Initialize Sanity project
sanity init

# Answer prompts:
```

**Prompt Responses:**

```
? Select project to use: Create new project
? Your project name: Equity by Design
? Use the default dataset configuration? Yes
? Project output path: ./
? Select project template: Clean project with no predefined schemas
```

**What this creates:**

```
equity-by-design-cms/
├── schemas/
│   └── index.ts
├── sanity.config.ts
├── sanity.cli.ts
├── package.json
└── README.md
```

#### 1.4 Install Dependencies

```bash
npm install

# Install additional packages we'll need
npm install @sanity/icons
npm install sanity-plugin-media
```

### Step 2: Configure Schemas

#### 2.1 Copy Schema Files

Copy all schema files from this repo into your Sanity project:

```bash
# From the backend directory, copy schemas
cp schemas/sanity-schema-blog-post.ts ../equity-by-design-cms/schemas/
cp schemas/sanity-schema-case-study.ts ../equity-by-design-cms/schemas/
cp schemas/sanity-schema-team-member.ts ../equity-by-design-cms/schemas/
cp schemas/sanity-schema-service.ts ../equity-by-design-cms/schemas/
```

#### 2.2 Update schemas/index.ts

```typescript
// schemas/index.ts
import blogPost, { categorySchema } from "./sanity-schema-blog-post";
import caseStudy from "./sanity-schema-case-study";
import teamMember from "./sanity-schema-team-member";
import service from "./sanity-schema-service";

export const schemaTypes = [
  // Blog
  blogPost,
  categorySchema,

  // Portfolio
  caseStudy,

  // Team
  teamMember,

  // Services
  service,
];
```

#### 2.3 Configure Sanity Studio

Update `sanity.config.ts`:

```typescript
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "equity-by-design",
  title: "Equity by Design",

  projectId: "YOUR_PROJECT_ID", // From sanity.io/manage
  dataset: "production",

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Blog section
            S.listItem()
              .title("📝 Blog")
              .child(
                S.list()
                  .title("Blog")
                  .items([
                    S.listItem()
                      .title("Posts")
                      .schemaType("blogPost")
                      .child(S.documentTypeList("blogPost").title("Posts")),
                    S.listItem()
                      .title("Categories")
                      .schemaType("category")
                      .child(
                        S.documentTypeList("category").title("Categories")
                      ),
                  ])
              ),

            // Case studies
            S.listItem()
              .title("💼 Case Studies")
              .schemaType("caseStudy")
              .child(S.documentTypeList("caseStudy").title("Case Studies")),

            // Team
            S.listItem()
              .title("👥 Team")
              .schemaType("teamMember")
              .child(
                S.documentTypeList("teamMember")
                  .title("Team Members")
                  .defaultOrdering([
                    { field: "displayOrder", direction: "asc" },
                  ])
              ),

            // Services
            S.listItem()
              .title("⚙️ Services")
              .schemaType("service")
              .child(
                S.documentTypeList("service")
                  .title("Services")
                  .defaultOrdering([
                    { field: "displayOrder", direction: "asc" },
                  ])
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
```

### Step 3: Generate API Tokens

#### 3.1 Create Tokens via Sanity Manage

```bash
# Open Sanity Manage in browser
sanity manage
```

**Or visit:** `https://sanity.io/manage`

**Navigate to:** Settings → API → Tokens

**Create these tokens:**

1. **Production Read Token**

   - Name: `Production Read Token`
   - Permissions: `Viewer`
   - This is safe to expose publicly

2. **Production Write Token**

   - Name: `Production Write Token`
   - Permissions: `Editor`
   - ⚠️ Keep this secret! Server-side only

3. **Development Token**
   - Name: `Development Token`
   - Permissions: `Editor`
   - For local development

**Save these tokens securely** - you'll need them for environment variables.

#### 3.2 Configure CORS

Still in Sanity Manage, navigate to: Settings → API → CORS Origins

**Add these origins:**

- `https://equitybydesign.com` (production site)
- `http://localhost:3000` (Next.js dev server)
- `http://localhost:3333` (Sanity Studio dev)

Check "Allow credentials" for each.

### Step 4: Deploy Sanity Studio

#### 4.1 Choose Deployment Method

**Option A: Sanity-Hosted (Recommended for simplicity)**

```bash
# Deploy to Sanity's hosting
sanity deploy

# Choose a hostname when prompted
# Example: equity-by-design

# Your studio will be at: https://equity-by-design.sanity.studio
```

**Option B: Self-Hosted with Next.js**

See [Next.js Integration](#nextjs-integration) section below.

### Step 5: Invite Team Members

```bash
# Invite via CLI
sanity users invite sarah@equitybydesign.com --role editor
sanity users invite marcus@equitybydesign.com --role contributor

# Or via Sanity Manage:
# Settings → Project Members → Invite
```

**Role Recommendations:**

- **Administrator**: Project owner, technical lead (1-2 people)
- **Editor**: Content team who can publish (2-5 people)
- **Contributor**: Can create drafts but not publish (interns, freelancers)

### Step 6: Configure Environment Variables

Create `.env.local` in your Next.js project root:

```bash
# Copy the example file
cp backend/config/.env.example .env.local

# Edit .env.local with your actual values
```

**Required variables:**

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz  # From Sanity Manage
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_read_xxxxx  # Production Read Token
SANITY_API_WRITE_TOKEN=sk_write_xxxxx  # Production Write Token (secret!)
SANITY_PREVIEW_SECRET=$(openssl rand -base64 32)  # Generate random

# Site
NEXT_PUBLIC_SITE_URL=https://equitybydesign.com

# Email
RESEND_API_KEY=re_xxxxx
INTERNAL_NOTIFICATION_EMAIL=team@equitybydesign.com

# Newsletter (optional)
CONVERTKIT_API_KEY=your_key
CONVERTKIT_FORM_ID=your_form_id
```

---

## Importing Sample Data

### Option 1: Via Sanity CLI (Recommended)

```bash
# Navigate to your Sanity project
cd equity-by-design-cms

# Import sample data
sanity dataset import ../backend/sample-data/sample-blog-posts.json production
sanity dataset import ../backend/sample-data/sample-case-studies.json production
sanity dataset import ../backend/sample-data/sample-team-members.json production
```

### Option 2: Manually via Studio

1. Open Sanity Studio (local or deployed)
2. Click "Blog Posts" → "+ Create"
3. Copy data from `sample-blog-posts.json`
4. Fill in fields manually
5. Upload sample images (use [Unsplash](https://unsplash.com) for placeholders)
6. Click "Publish"

### Option 3: Via Sanity Client Script

Create `import-data.js`:

```javascript
const sanityClient = require("@sanity/client");
const fs = require("fs");

const client = sanityClient({
  projectId: "your_project_id",
  dataset: "production",
  token: "your_editor_token",
  useCdn: false,
});

const blogPosts = JSON.parse(
  fs.readFileSync("./sample-data/sample-blog-posts.json")
);

async function importData() {
  for (const post of blogPosts.blogPosts) {
    const result = await client.create(post);
    console.log(`Created blog post: ${result.title}`);
  }
}

importData();
```

Run:

```bash
node import-data.js
```

---

## Next.js Integration

### Step 1: Install Dependencies

```bash
cd your-nextjs-project

# Install Sanity client
npm install @sanity/client next-sanity
npm install @sanity/image-url

# Install other dependencies
npm install zod  # For form validation
npm install resend  # For emails
```

### Step 2: Create Sanity Configuration

Create `lib/sanity.client.ts`:

```typescript
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
```

### Step 3: Copy API Routes

Copy API route files from `backend/api-routes/` to your Next.js project:

```bash
# Create directories
mkdir -p app/api/blog
mkdir -p app/api/case-studies
mkdir -p app/api/contact
mkdir -p app/api/newsletter

# Copy route files
cp backend/api-routes/blog-posts-route.ts app/api/blog/route.ts
cp backend/api-routes/case-studies-route.ts app/api/case-studies/route.ts
cp backend/api-routes/contact-form-route.ts app/api/contact/route.ts
cp backend/api-routes/newsletter-route.ts app/api/newsletter/route.ts
```

### Step 4: Create Example Page

Create `app/insights/page.tsx`:

```typescript
import { getBlogPosts } from "@/api-routes/blog-posts-route";

export default async function InsightsPage() {
  const { posts } = await getBlogPosts({ pageSize: 10 });

  return (
    <div>
      <h1>Insights</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <a href={`/insights/${post.slug}`}>Read more</a>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### Step 5: Set Up Webhooks for Auto-Revalidation

In Sanity Manage → Settings → Webhooks:

**Create webhook:**

- Name: `Next.js Revalidation`
- URL: `https://your-site.com/api/revalidate`
- Secret: `your_webhook_secret`
- Trigger on: Create, Update, Delete
- Filter: `_type in ["blogPost", "caseStudy", "teamMember", "service"]`

**Create API route** `app/api/revalidate/route.ts`:

```typescript
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-sanity-webhook-secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json();
  const { _type, slug } = body;

  // Revalidate relevant paths
  if (_type === "blogPost") {
    revalidatePath("/insights");
    if (slug?.current) {
      revalidatePath(`/insights/${slug.current}`);
    }
  } else if (_type === "caseStudy") {
    revalidatePath("/work");
    if (slug?.current) {
      revalidatePath(`/work/${slug.current}`);
    }
  }

  return Response.json({ revalidated: true });
}
```

---

## Testing

### Test Checklist

**Sanity Studio:**

- [ ] Can log in successfully
- [ ] Can create a blog post
- [ ] Can upload images
- [ ] Preview shows correctly
- [ ] Can publish content
- [ ] Published content appears on website within 2 minutes

**Next.js Website:**

- [ ] Blog posts load
- [ ] Case studies load
- [ ] Team members display
- [ ] Services pages work
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] Preview mode works for drafts

**API Routes:**

- [ ] GET /api/blog returns posts
- [ ] GET /api/case-studies returns studies
- [ ] POST /api/contact sends email
- [ ] POST /api/newsletter subscribes user

### Testing Commands

```bash
# Test Sanity connection
curl https://your-project-id.api.sanity.io/v1/data/query/production\?query=\*\[_type==\"blogPost\"\]

# Test Next.js API route
curl http://localhost:3000/api/blog

# Run Next.js in dev mode
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start
```

---

## Deployment

### Deploy to Vercel (Recommended)

#### 1. Connect GitHub Repository

```bash
# Push to GitHub
git add .
git commit -m "Initial commit with Sanity CMS setup"
git push origin main
```

#### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### 3. Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

Add all variables from `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `SANITY_API_WRITE_TOKEN`
- `SANITY_PREVIEW_SECRET`
- `RESEND_API_KEY`
- etc.

#### 4. Deploy

Click "Deploy" - Vercel will build and deploy automatically.

Your site will be live at: `https://your-project.vercel.app`

#### 5. Set Up Custom Domain

In Vercel → Settings → Domains:

- Add `equitybydesign.com`
- Follow DNS configuration instructions

---

## Training Non-Technical Users

### Week 1: Orientation

**Day 1-2: Introduction**

- Share the [Admin User Guide](./ADMIN_USER_GUIDE.md)
- Give each person their Sanity Studio login
- Tour of the interface (15-minute video call)

**Day 3-4: Practice**

- Each person creates ONE practice blog post
- Use real content but mark as draft
- Practice uploading images
- Practice adding links

**Day 5: Review**

- Review everyone's practice posts
- Give feedback
- Answer questions

### Week 2: Real Content

**Goal: Each person publishes ONE real piece of content**

- Create actual blog post or case study
- Go through full workflow: draft → preview → publish
- Monitor analytics after publishing

### Ongoing Support

**Weekly Office Hours:**

- 30-minute drop-in session
- Screen share for troubleshooting
- Q&A

**Documentation:**

- Keep [Admin User Guide](./ADMIN_USER_GUIDE.md) bookmarked
- Create internal FAQ based on common questions
- Record screencasts for common tasks

---

## Ongoing Maintenance

### Weekly Tasks

- [ ] Review published content for quality
- [ ] Check website analytics
- [ ] Monitor contact form submissions
- [ ] Review newsletter subscriber growth

### Monthly Tasks

- [ ] Update Sanity Studio (if self-hosted)
- [ ] Review and optimize images
- [ ] Check for broken links
- [ ] Review SEO performance
- [ ] Backup content (Sanity has automatic backups, but good to export manually)

### Quarterly Tasks

- [ ] Content audit (remove outdated content)
- [ ] User access review (remove inactive users)
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit (WCAG compliance check)

### Content Backup

```bash
# Export all content to JSON
sanity dataset export production backup.tar.gz

# Export specific document type
sanity dataset export production backup-blog.tar.gz --types blogPost
```

### Updating Sanity

```bash
# Update Sanity CLI
npm update -g @sanity/cli

# Update Sanity packages in project
cd equity-by-design-cms
npm update

# Test locally before deploying
sanity start

# Deploy updated studio
sanity deploy
```

---

## Troubleshooting

### Common Issues

#### "Can't connect to Sanity"

**Check:**

1. Is `NEXT_PUBLIC_SANITY_PROJECT_ID` correct?
2. Is `NEXT_PUBLIC_SANITY_DATASET` set to `production`?
3. Are CORS origins configured in Sanity Manage?

**Solution:**

```bash
# Verify project ID
sanity projects list

# Check CORS settings
sanity manage
# Navigate to Settings → API → CORS Origins
```

#### "Images not loading"

**Check:**

1. Did you upload images to Sanity (not local files)?
2. Is the image URL using Sanity's CDN?
3. Are you using `imageUrlBuilder` correctly?

**Solution:**

```typescript
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

// Usage:
<img src={urlFor(post.featuredImage).url()} alt={post.featuredImage.alt} />;
```

#### "Contact form not sending emails"

**Check:**

1. Is `RESEND_API_KEY` set correctly?
2. Is the from email verified in Resend?
3. Check Resend dashboard for error logs

**Solution:**

```bash
# Test Resend API key
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"from":"test@yourdomain.com","to":"you@example.com","subject":"Test","html":"Test"}'
```

#### "Preview mode not working"

**Check:**

1. Is `SANITY_PREVIEW_SECRET` set?
2. Does the secret match in both Sanity config and Next.js?
3. Are you accessing the preview URL correctly?

**Solution:**

```typescript
// Verify secret in both places matches
// In Next.js: process.env.SANITY_PREVIEW_SECRET
// In Sanity config: preview URL includes same secret
```

#### "Content not updating on website"

**Check:**

1. Did you click "Publish" (not just "Save")?
2. Is ISR revalidation working?
3. Is the webhook configured correctly?

**Solution:**

```bash
# Manually revalidate a path
# Create app/api/manual-revalidate/route.ts
export async function GET() {
  revalidatePath('/insights')
  return Response.json({ revalidated: true })
}

# Visit: https://your-site.com/api/manual-revalidate
```

---

## Next Steps

After completing this setup:

1. **Import sample data** or create your first real content
2. **Train your team** using the Admin User Guide
3. **Customize the design** in your Next.js frontend
4. **Set up analytics** (Plausible, Fathom, or Google Analytics)
5. **Launch!** 🚀

---

## Support Resources

**Sanity Documentation:**

- [Sanity Docs](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

**Next.js Documentation:**

- [Next.js Docs](https://nextjs.org/docs)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

**Community:**

- [Sanity Slack](https://slack.sanity.io) (20K+ members)
- [Next.js Discord](https://nextjs.org/discord)

**Equity by Design Specific:**

- [CMS Selection Analysis](./CMS_SELECTION_ANALYSIS.md)
- [Admin User Guide](./ADMIN_USER_GUIDE.md)
- [Authentication Strategy](./AUTHENTICATION_STRATEGY.md)

---

**Document Version:** 1.0
**Last Updated:** December 1, 2025
**Estimated Setup Time:** 2-4 hours for developers, 1-2 hours for content setup
