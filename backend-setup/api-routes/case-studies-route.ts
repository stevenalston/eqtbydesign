/**
 * Case Studies API Route
 * Next.js App Router - Server Actions & Route Handlers
 *
 * Fetches case studies from Sanity CMS with:
 * - Filtering by industry, project type, featured status
 * - Individual case study retrieval
 * - Related case studies
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  client: {
    name: string
    industry: string
    location: string
    website: string
    logo: any
  }
  projectType: string[]
  timeline: {
    startDate: string
    endDate: string
    duration: string
  }
  challenge: {
    overview: any[]
    painPoints: Array<{ point: string; description: string }>
  }
  approach: {
    methodology: any[]
    processSteps: Array<{
      stepNumber: number
      title: string
      description: string
      icon: string
    }>
  }
  solution: {
    overview: any[]
    deliverables: Array<{ name: string; description: string }>
    features: string[]
  }
  impact: {
    overview: any[]
    metrics: Array<{
      metric: string
      value: string
      change: string
      context: string
      icon: string
    }>
    testimonial?: {
      quote: string
      author: string
      role: string
      photo: any
    }
  }
  heroImage: {
    asset: any
    alt: string
  }
  gallery: Array<{
    asset: any
    alt: string
    caption?: string
  }>
  beforeAfter?: {
    before: any
    after: any
    description: string
  }
  featured: boolean
  isDraft: boolean
  publishedAt: string
}

export interface CaseStudyListItem {
  _id: string
  title: string
  slug: string
  shortDescription: string
  client: {
    name: string
    industry: string
  }
  projectType: string[]
  heroImage: string
  impactMetrics: Array<{
    metric: string
    value: string
  }>
  featured: boolean
  publishedAt: string
}

// ============================================================================
// GROQ QUERIES
// ============================================================================

const CASE_STUDY_FIELDS = `
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  shortDescription,
  client,
  projectType,
  timeline,
  challenge,
  approach,
  solution,
  impact,
  heroImage {
    asset,
    alt
  },
  gallery[] {
    asset,
    alt,
    caption
  },
  beforeAfter,
  featured,
  isDraft,
  publishedAt,
  relatedCaseStudies[]-> {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    "heroImage": heroImage.asset->url
  }
`

const CASE_STUDY_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  client {
    name,
    industry
  },
  projectType,
  "heroImage": heroImage.asset->url,
  "impactMetrics": impact.metrics[0..2] {
    metric,
    value
  },
  featured,
  publishedAt
`

// ============================================================================
// ROUTE HANDLER: GET /api/case-studies
// ============================================================================

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const industry = searchParams.get('industry')
  const projectType = searchParams.get('projectType')
  const featured = searchParams.get('featured') === 'true'
  const preview = searchParams.get('preview') === 'true'

  try {
    const caseStudies = await getCaseStudies({
      industry,
      projectType,
      featured,
      preview,
    })

    return Response.json(caseStudies, {
      headers: {
        'Cache-Control': preview ? 'no-cache' : 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return Response.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    )
  }
}

// ============================================================================
// SERVER ACTIONS
// ============================================================================

/**
 * Get all case studies with optional filtering
 */
export async function getCaseStudies({
  industry,
  projectType,
  featured,
  preview = false,
}: {
  industry?: string | null
  projectType?: string | null
  featured?: boolean
  preview?: boolean
} = {}): Promise<CaseStudyListItem[]> {
  'use server'

  const filters: string[] = ['_type == "caseStudy"']

  if (!preview) {
    filters.push('isDraft != true')
  }

  if (industry) {
    filters.push(`client.industry == "${industry}"`)
  }

  if (projectType) {
    filters.push(`"${projectType}" in projectType`)
  }

  if (featured) {
    filters.push('featured == true')
  }

  const filterString = filters.join(' && ')

  const query = `*[${filterString}] | order(
    featured desc,
    publishedAt desc
  ) {
    ${CASE_STUDY_LIST_FIELDS}
  }`

  return client.fetch(query)
}

/**
 * Get a single case study by slug
 */
export async function getCaseStudyBySlug(
  slug: string,
  preview = false
): Promise<CaseStudy | null> {
  'use server'

  const filters = ['_type == "caseStudy"', `slug.current == "${slug}"`]

  if (!preview) {
    filters.push('isDraft != true')
  }

  const query = `*[${filters.join(' && ')}][0] {
    ${CASE_STUDY_FIELDS}
  }`

  return client.fetch(query)
}

/**
 * Get featured case studies for homepage
 */
export async function getFeaturedCaseStudies(
  limit = 3
): Promise<CaseStudyListItem[]> {
  'use server'

  const query = `*[
    _type == "caseStudy" &&
    isDraft != true &&
    featured == true
  ] | order(publishedAt desc) [0...${limit}] {
    ${CASE_STUDY_LIST_FIELDS}
  }`

  return client.fetch(query)
}

/**
 * Get related case studies based on project type or industry
 */
export async function getRelatedCaseStudies(
  caseStudyId: string,
  limit = 3
): Promise<CaseStudyListItem[]> {
  'use server'

  const query = `*[_type == "caseStudy" && _id == "${caseStudyId}"][0] {
    "related": *[
      _type == "caseStudy" &&
      _id != ^._id &&
      isDraft != true &&
      (
        client.industry == ^.client.industry ||
        count((projectType)[@ in ^.projectType]) > 0
      )
    ] | order(publishedAt desc) [0...${limit}] {
      ${CASE_STUDY_LIST_FIELDS}
    }
  }.related`

  return client.fetch(query)
}

/**
 * Get all unique industries from case studies
 */
export async function getCaseStudyIndustries(): Promise<
  Array<{ industry: string; count: number }>
> {
  'use server'

  const query = `*[_type == "caseStudy" && isDraft != true] {
    "industry": client.industry
  }.industry | {
    "industry": @,
    "count": count(*[_type == "caseStudy" && client.industry == @ && isDraft != true])
  } | order(count desc)`

  return client.fetch(query)
}

/**
 * Get all unique project types
 */
export async function getCaseStudyProjectTypes(): Promise<
  Array<{ type: string; count: number }>
> {
  'use server'

  const query = `*[_type == "caseStudy" && isDraft != true] {
    projectType
  }.projectType[] | {
    "type": @,
    "count": count(*[_type == "caseStudy" && @ in projectType && isDraft != true])
  } | order(count desc)`

  return client.fetch(query)
}

/**
 * Get case study metrics summary for homepage stats
 */
export async function getCaseStudyStats(): Promise<{
  totalProjects: number
  totalImpact: {
    usersReached?: number
    organizationsServed?: number
    averageIncrease?: number
  }
}> {
  'use server'

  const query = `{
    "totalProjects": count(*[_type == "caseStudy" && isDraft != true]),
    "caseStudies": *[_type == "caseStudy" && isDraft != true] {
      impact.metrics
    }
  }`

  const result = await client.fetch(query)

  // You can process metrics here to extract meaningful stats
  // This is a simplified example
  return {
    totalProjects: result.totalProjects,
    totalImpact: {
      // Process impact metrics as needed
    },
  }
}

// ============================================================================
// ISR HELPERS
// ============================================================================

/**
 * Generate static params for all case studies
 */
export async function generateCaseStudyStaticParams() {
  const query = `*[_type == "caseStudy" && isDraft != true] {
    "slug": slug.current
  }`

  const caseStudies = await client.fetch(query)
  return caseStudies.map((cs: { slug: string }) => ({ slug: cs.slug }))
}

/**
 * Revalidate case study
 */
export async function revalidateCaseStudy(slug: string) {
  'use server'

  const { revalidatePath } = await import('next/cache')
  revalidatePath(`/work/${slug}`)
  revalidatePath('/work')
}
