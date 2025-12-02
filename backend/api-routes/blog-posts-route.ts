/**
 * Blog Posts API Route
 * Next.js App Router - Server Actions & Route Handlers
 *
 * Fetches blog posts from Sanity CMS with:
 * - Pagination support
 * - Filtering by category/tag
 * - Search functionality
 * - Draft preview mode
 */

import { createClient } from '@sanity/client'
import type { SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // For authenticated requests
})

// Image URL builder
const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BlogPost {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: { current: string }
  excerpt: string
  content: any[] // Portable Text
  featuredImage: {
    asset: any
    alt: string
  }
  author: {
    _id: string
    name: string
    photo: any
    role: string
  }
  categories: Array<{
    _id: string
    title: string
    slug: { current: string }
  }>
  tags: string[]
  publishedAt: string
  isDraft: boolean
  readingTime: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

export interface BlogPostListItem {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  author: {
    name: string
    photo: string
  }
  categories: string[]
  tags: string[]
  publishedAt: string
  readingTime: number
}

export interface PaginatedBlogPosts {
  posts: BlogPostListItem[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ============================================================================
// GROQ QUERIES
// ============================================================================

const BLOG_POST_FIELDS = `
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  content,
  featuredImage {
    asset,
    alt
  },
  author-> {
    _id,
    name,
    photo,
    role
  },
  categories[]-> {
    _id,
    title,
    slug
  },
  tags,
  publishedAt,
  isDraft,
  readingTime,
  seo
`

const BLOG_POST_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "featuredImage": featuredImage.asset->url,
  author-> {
    name,
    "photo": photo.asset->url
  },
  "categories": categories[]->title,
  tags,
  publishedAt,
  readingTime
`

// ============================================================================
// ROUTE HANDLER: GET /api/blog
// ============================================================================

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Parse query parameters
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')
  const search = searchParams.get('search')
  const preview = searchParams.get('preview') === 'true'

  try {
    const posts = await getBlogPosts({
      page,
      pageSize,
      category,
      tag,
      search,
      preview,
    })

    return Response.json(posts, {
      headers: {
        'Cache-Control': preview ? 'no-cache' : 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return Response.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// ============================================================================
// SERVER ACTIONS
// ============================================================================

/**
 * Get paginated blog posts with optional filtering
 */
export async function getBlogPosts({
  page = 1,
  pageSize = 10,
  category,
  tag,
  search,
  preview = false,
}: {
  page?: number
  pageSize?: number
  category?: string | null
  tag?: string | null
  search?: string | null
  preview?: boolean
} = {}): Promise<PaginatedBlogPosts> {
  'use server'

  // Build filter conditions
  const filters: string[] = ['_type == "blogPost"']

  // Only show published posts in production (unless preview mode)
  if (!preview) {
    filters.push('isDraft != true')
    filters.push('publishedAt <= now()')
  }

  // Category filter
  if (category) {
    filters.push(`"${category}" in categories[]->slug.current`)
  }

  // Tag filter
  if (tag) {
    filters.push(`"${tag}" in tags`)
  }

  // Search filter (searches title, excerpt, and content)
  if (search) {
    const searchTerm = search.toLowerCase()
    filters.push(`(
      lower(title) match "*${searchTerm}*" ||
      lower(excerpt) match "*${searchTerm}*"
    )`)
  }

  const filterString = filters.join(' && ')

  // Calculate pagination
  const start = (page - 1) * pageSize
  const end = start + pageSize

  // Fetch posts and total count
  const query = `{
    "posts": *[${filterString}] | order(publishedAt desc) [${start}...${end}] {
      ${BLOG_POST_LIST_FIELDS}
    },
    "total": count(*[${filterString}])
  }`

  const result = await client.fetch(query)

  return {
    posts: result.posts,
    total: result.total,
    page,
    pageSize,
    hasMore: end < result.total,
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(
  slug: string,
  preview = false
): Promise<BlogPost | null> {
  'use server'

  const filters = ['_type == "blogPost"', `slug.current == "${slug}"`]

  if (!preview) {
    filters.push('isDraft != true')
  }

  const query = `*[${filters.join(' && ')}][0] {
    ${BLOG_POST_FIELDS}
  }`

  return client.fetch(query)
}

/**
 * Get related blog posts based on categories and tags
 */
export async function getRelatedBlogPosts(
  postId: string,
  limit = 3
): Promise<BlogPostListItem[]> {
  'use server'

  const query = `*[_type == "blogPost" && _id == "${postId}"][0] {
    "related": *[
      _type == "blogPost" &&
      _id != ^._id &&
      isDraft != true &&
      (
        count((categories[]->_id)[@ in ^.categories[]->_id]) > 0 ||
        count((tags)[@ in ^.tags]) > 0
      )
    ] | order(publishedAt desc) [0...${limit}] {
      ${BLOG_POST_LIST_FIELDS}
    }
  }.related`

  return client.fetch(query)
}

/**
 * Get all categories with post counts
 */
export async function getBlogCategories(): Promise<
  Array<{ _id: string; title: string; slug: string; count: number }>
> {
  'use server'

  const query = `*[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    "count": count(*[_type == "blogPost" && references(^._id) && isDraft != true])
  } | order(count desc)`

  return client.fetch(query)
}

/**
 * Get all tags with post counts
 */
export async function getBlogTags(): Promise<
  Array<{ tag: string; count: number }>
> {
  'use server'

  const query = `*[_type == "blogPost" && isDraft != true] {
    tags
  }.tags[] | {
    "tag": @,
    "count": count(*[_type == "blogPost" && @ in tags && isDraft != true])
  } | order(count desc)`

  return client.fetch(query)
}

/**
 * Search blog posts (full-text search)
 */
export async function searchBlogPosts(
  searchTerm: string,
  limit = 10
): Promise<BlogPostListItem[]> {
  'use server'

  const query = `*[
    _type == "blogPost" &&
    isDraft != true &&
    (
      title match "*${searchTerm}*" ||
      excerpt match "*${searchTerm}*" ||
      pt::text(content) match "*${searchTerm}*"
    )
  ] | order(publishedAt desc) [0...${limit}] {
    ${BLOG_POST_LIST_FIELDS}
  }`

  return client.fetch(query)
}

/**
 * Get recent blog posts for homepage
 */
export async function getRecentBlogPosts(
  limit = 3
): Promise<BlogPostListItem[]> {
  'use server'

  const query = `*[
    _type == "blogPost" &&
    isDraft != true &&
    publishedAt <= now()
  ] | order(publishedAt desc) [0...${limit}] {
    ${BLOG_POST_LIST_FIELDS}
  }`

  return client.fetch(query)
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(
  limit = 3
): Promise<BlogPostListItem[]> {
  'use server'

  // You can add a "featured" field to the schema or use other criteria
  // For now, using most recent posts with good engagement metrics
  const query = `*[
    _type == "blogPost" &&
    isDraft != true &&
    publishedAt <= now()
  ] | order(publishedAt desc) [0...${limit}] {
    ${BLOG_POST_LIST_FIELDS}
  }`

  return client.fetch(query)
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate reading time from Portable Text content
 */
export function calculateReadingTime(content: any[]): number {
  const wordsPerMinute = 200
  const text = content
    .filter((block) => block._type === 'block')
    .map((block) =>
      block.children
        .filter((child: any) => child._type === 'span')
        .map((child: any) => child.text)
        .join(' ')
    )
    .join(' ')

  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get blog post URL
 */
export function getBlogPostUrl(slug: string): string {
  return `/insights/${slug}`
}

// ============================================================================
// INCREMENTAL STATIC REGENERATION (ISR) HELPERS
// ============================================================================

/**
 * Generate static params for all blog posts (for ISR)
 */
export async function generateBlogPostStaticParams() {
  const query = `*[_type == "blogPost" && isDraft != true] {
    "slug": slug.current
  }`

  const posts = await client.fetch(query)
  return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}

/**
 * Revalidate blog posts (call via webhook from Sanity)
 */
export async function revalidateBlogPost(slug: string) {
  'use server'

  // In Next.js 15, use revalidatePath
  const { revalidatePath } = await import('next/cache')
  revalidatePath(`/insights/${slug}`)
  revalidatePath('/insights') // Revalidate list page too
}
