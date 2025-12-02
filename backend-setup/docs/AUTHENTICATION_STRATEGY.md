# Authentication & Authorization Strategy
## Equity by Design Website

This document outlines the comprehensive authentication and authorization strategy for the Equity by Design website, covering both Sanity Studio (CMS admin) and Next.js application.

---

## Table of Contents

1. [Overview](#overview)
2. [Sanity Studio Authentication](#sanity-studio-authentication)
3. [Next.js Application Authentication](#nextjs-application-authentication)
4. [Authorization & Roles](#authorization--roles)
5. [Security Best Practices](#security-best-practices)
6. [Implementation Guide](#implementation-guide)

---

## Overview

### Authentication Architecture

```
┌────────────────────────────────────────────────────────┐
│                    Public Website                       │
│              (Next.js - No Auth Required)              │
│  - Home, About, Services, Blog (read), Contact        │
└────────────────────────────────────────────────────────┘
                          ↓
┌────────────────────────────────────────────────────────┐
│              Sanity Studio (CMS Admin)                 │
│          (Requires Authentication & Authorization)     │
│  - Content creation & editing                         │
│  - Media management                                   │
│  - User management                                    │
└────────────────────────────────────────────────────────┘
                          ↓
┌────────────────────────────────────────────────────────┐
│                  Sanity Content Lake                   │
│              (API Keys & Tokens Required)             │
│  - Read API: Public (read-only)                       │
│  - Write API: Authenticated (token-based)            │
└────────────────────────────────────────────────────────┘
```

### Authentication Layers

1. **Sanity Studio Access**: Who can log into the CMS
2. **Content API Access**: API keys for reading/writing content
3. **Next.js Preview Mode**: Authenticated preview of draft content
4. **Admin API Routes**: Protected server actions

---

## Sanity Studio Authentication

### Built-in Authentication

Sanity provides robust, built-in authentication with multiple providers:

#### Supported Providers

✅ **Google** (Recommended for most teams)
✅ **GitHub** (Great for developer-heavy teams)
✅ **Email/Password** (Traditional approach)
✅ **SAML SSO** (Enterprise plans only)

#### Recommended Setup: Google OAuth

**Why Google?**
- Most non-technical users already have Google accounts
- No password management burden
- Secure 2FA built-in
- Easy onboarding

**Configuration:**

1. **Enable Google Login in Sanity**
   ```bash
   # In your Sanity project
   sanity manage
   # Navigate to: Settings → Login Providers
   # Enable: Google
   ```

2. **Invite Team Members**
   ```bash
   sanity users invite user@equitybydesign.com
   ```

3. **Set Roles** (covered in Authorization section)

### Studio Access Control

**Studio URL Security:**

```javascript
// sanity.config.ts
export default defineConfig({
  name: 'equity-by-design',
  title: 'Equity by Design',

  // Studio accessible only at specific domain
  basePath: '/studio',

  // API configuration
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',

  // Plugins
  plugins: [
    deskTool(),
    visionTool(), // Only for admins in production
  ],

  // IMPORTANT: Studio requires authentication
  // No anonymous access allowed
  auth: {
    // Redirect after login
    redirectOnSingle: false,
    // Login providers
    providers: [
      {
        name: 'google',
        title: 'Google',
        logo: GoogleLogo,
      },
    ],
  },
})
```

### Deployment Options

#### Option 1: Sanity-Hosted Studio (Recommended for Non-Technical Teams)

**URL**: `https://your-project.sanity.studio`

**Pros:**
- ✅ No deployment setup needed
- ✅ Always up-to-date
- ✅ Sanity handles SSL, security patches
- ✅ Free on all plans
- ✅ Easy to share: just send the link

**Cons:**
- ⚠️ Separate domain from main website
- ⚠️ Less customization

**Setup:**
```bash
# Deploy to Sanity's hosting
sanity deploy
# Follow prompts to choose a studio hostname
```

#### Option 2: Self-Hosted Studio (More Control)

**URL**: `https://equitybydesign.com/studio`

**Pros:**
- ✅ Same domain as website
- ✅ Full control over deployment
- ✅ Custom branding
- ✅ Can integrate with existing auth systems

**Cons:**
- ⚠️ Requires Next.js setup
- ⚠️ You manage updates and security

**Setup:**
```typescript
// app/studio/[[...index]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

### User Onboarding Flow

1. **Admin sends invite** via Sanity dashboard
2. **User receives email** with magic link
3. **User clicks link** → prompted to choose login provider
4. **User selects Google** (or other provider)
5. **User authorizes** → redirected to Studio
6. **First-time setup**: Brief tour of the interface
7. **Ready to create content!**

---

## Next.js Application Authentication

### Public Content (No Auth)

Most of the website is public:
- Homepage
- About page
- Services
- Published blog posts
- Published case studies
- Contact form

**No authentication required for visitors.**

### Preview Mode (Authenticated)

Allow content editors to preview draft content before publishing.

#### Implementation

```typescript
// app/api/preview/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { validatePreviewUrl } from '@/lib/sanity.server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type')

  // Verify secret token
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Verify the content exists
  const contentExists = await validatePreviewUrl(type, slug)
  if (!contentExists) {
    return new Response('Content not found', { status: 404 })
  }

  // Enable Draft Mode
  draftMode().enable()

  // Redirect to the path from the fetched content
  redirect(`/${type}/${slug}`)
}
```

**Preview Link in Sanity Studio:**

```typescript
// sanity.config.ts
export default defineConfig({
  // ...
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(
                S.documentTypeList('blogPost')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('blogPost')
                      .views([
                        S.view.form(),
                        S.view
                          .component(PreviewIframe)
                          .title('Preview')
                          .options({
                            url: (doc: any) =>
                              `/api/preview?secret=${process.env.SANITY_PREVIEW_SECRET}&type=insights&slug=${doc.slug.current}`,
                          }),
                      ])
                  )
              ),
            // ... other content types
          ]),
    }),
  ],
})
```

**Security:**
- Preview secret stored in environment variables
- Only accessible to authenticated Sanity users
- Temporary session (expires when browser closes)

### Admin API Routes (Protected)

Some API routes should be protected (e.g., form submissions with sensitive data).

#### Using API Route Protection

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.headers.get('Authorization')

    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
```

---

## Authorization & Roles

### Sanity Studio Roles

Sanity provides flexible role-based access control (RBAC).

#### Built-in Roles

| Role | Permissions | Best For |
|------|-------------|----------|
| **Administrator** | Full access to everything | Project owner, technical lead |
| **Editor** | Create, edit, publish content | Content team, marketing |
| **Contributor** | Create and edit drafts, cannot publish | Freelancers, interns |
| **Viewer** | Read-only access | Stakeholders, clients |

#### Custom Role Examples

**Content Manager** (Create custom role for team leads)
```javascript
// Custom role configuration
{
  name: 'contentManager',
  title: 'Content Manager',
  permissions: [
    { filter: '_type == "blogPost"', role: 'editor' },
    { filter: '_type == "caseStudy"', role: 'editor' },
    { filter: '_type == "teamMember"', role: 'contributor' },
    { filter: '_type == "service"', role: 'viewer' },
  ],
}
```

**Designer** (Can edit case studies and media only)
```javascript
{
  name: 'designer',
  title: 'Designer',
  permissions: [
    { filter: '_type == "caseStudy"', role: 'editor' },
    { filter: '_type == "media.image"', role: 'editor' },
    { filter: '*', role: 'viewer' }, // Read-only for everything else
  ],
}
```

### Recommended Role Assignment

**For Equity by Design team:**

| Team Member | Role | Can Do |
|-------------|------|--------|
| Founder/Owner | Administrator | Everything |
| Creative Director | Administrator | Everything |
| Content Lead | Editor | Publish blog posts, case studies |
| Designer | Content Manager | Edit case studies, drafts only for blog |
| Marketing Intern | Contributor | Create drafts, cannot publish |
| Client (viewing project) | Viewer | See preview of their case study |

### Role Assignment Process

1. **Admin logs into Sanity Manage**
   ```
   sanity manage
   ```

2. **Navigate to Project Settings → Members**

3. **Invite user** with email and role

4. **User accepts invite** and gets appropriate permissions

---

## Security Best Practices

### Environment Variables

**Never commit these to Git:**

```bash
# .env.local (Next.js)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token  # Keep secret!
SANITY_PREVIEW_SECRET=your_random_secret  # Keep secret!

# Email service
RESEND_API_KEY=your_resend_key

# Other services
CONVERTKIT_API_KEY=your_convertkit_key
```

**Create separate tokens for different environments:**
- Production (read-only for public site)
- Development (write access for local development)
- CI/CD (specific permissions for deployments)

### API Token Management

#### Read Token (Public)

Safe to expose in client-side code:

```typescript
// lib/sanity.client.ts
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for fast, cached responses
  // No token = read-only access to published content
})
```

#### Write Token (Secret)

**NEVER expose in client-side code:**

```typescript
// lib/sanity.server.ts
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Secret!
})

// Only use in server components or API routes
```

### CORS Configuration

Configure allowed origins in Sanity:

```bash
sanity cors add https://equitybydesign.com --credentials
sanity cors add http://localhost:3000 --credentials
```

### Content Security Policy (CSP)

```typescript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.sanity.io;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: *.sanity.io cdn.sanity.io;
  font-src 'self';
  connect-src 'self' *.sanity.io;
  frame-src 'self' *.sanity.studio;
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

### Audit Logging

Sanity automatically tracks:
- Who created/edited content
- When changes were made
- Version history

Access via:
```bash
sanity manage
# Navigate to: Dataset → History
```

---

## Implementation Guide

### Step-by-Step Setup

#### 1. Initialize Sanity Project

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize project
sanity init

# Follow prompts:
# - Create new project: "Equity by Design"
# - Use schema: Blank
# - Dataset: production
```

#### 2. Configure Authentication

```bash
# Open Sanity Manage dashboard
sanity manage

# Enable login providers:
# Settings → Login Providers → Enable Google
```

#### 3. Create API Tokens

```bash
sanity manage

# Navigate to: Settings → API → Tokens
# Create:
# 1. "Production Read Token" - Viewer role
# 2. "Production Write Token" - Editor role (for server actions)
# 3. "Development Token" - Editor role (for local development)
```

#### 4. Invite Team Members

```bash
# Via CLI
sanity users invite sarah@equitybydesign.com --role editor

# Or via dashboard
# Settings → Project Members → Invite
```

#### 5. Deploy Studio

**Option A: Sanity-hosted**
```bash
sanity deploy
# Choose a hostname: equity-by-design
# Studio URL: https://equity-by-design.sanity.studio
```

**Option B: Self-hosted with Next.js**
```bash
# Already included in Next.js app at /studio route
# Just deploy Next.js app to Vercel/Netlify
```

#### 6. Set Up Environment Variables

```bash
# In Vercel/Netlify dashboard, add:
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_read_xxx
SANITY_API_WRITE_TOKEN=sk_write_xxx
SANITY_PREVIEW_SECRET=random_secret_string
```

#### 7. Configure Webhooks (Optional)

Auto-revalidate Next.js when content changes:

```bash
# In Sanity Manage
# Settings → Webhooks → Create

# URL: https://equitybydesign.com/api/revalidate
# Secret: your_webhook_secret
# Trigger on: Create, Update, Delete
# Dataset: production
# Document types: blogPost, caseStudy, teamMember, service
```

---

## Troubleshooting

### Common Issues

**Can't log into Studio**
- Check if login provider is enabled
- Verify user has been invited
- Try incognito mode (clear cookies)

**403 Forbidden errors**
- Check API token permissions
- Verify token is in correct environment variable
- Check CORS settings

**Preview mode not working**
- Verify `SANITY_PREVIEW_SECRET` matches in both Sanity config and Next.js
- Check if draft content exists
- Clear browser cookies and try again

**Content not updating on website**
- Check if ISR revalidation is working
- Manually trigger revalidation via webhook
- Verify CDN cache settings

---

## Summary

**Authentication Strategy:**
- ✅ Sanity handles CMS authentication (Google OAuth recommended)
- ✅ Public website requires no authentication
- ✅ Preview mode uses secret token + draft mode
- ✅ API routes protected with environment-based tokens

**Authorization Strategy:**
- ✅ Role-based access control in Sanity
- ✅ Administrators for full control
- ✅ Editors for content management
- ✅ Contributors for draft creation
- ✅ Viewers for read-only access

**Security:**
- ✅ Separate read/write tokens
- ✅ Environment variables for secrets
- ✅ CORS configuration
- ✅ CSP headers
- ✅ Audit logging built-in

**For Non-Technical Users:**
- ✅ Simple Google login
- ✅ No password management
- ✅ Automatic user onboarding
- ✅ Clear role assignments

---

**Document Version**: 1.0
**Last Updated**: December 1, 2025
**Next Review**: March 1, 2026
