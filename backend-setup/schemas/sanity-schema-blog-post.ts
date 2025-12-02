/**
 * Blog Post Schema for Sanity CMS
 * Equity by Design Website
 *
 * Supports rich content authoring with features for non-technical users:
 * - Portable Text rich editor
 * - Featured image with alt text
 * - SEO metadata
 * - Tags and categories
 * - Author references
 * - Draft/publish workflow
 */

import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    // Basic Information
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main headline for the blog post',
      validation: (Rule) => Rule.required().min(10).max(100).warning('Title should be between 10-100 characters for optimal SEO'),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'This becomes the URL path (e.g., "design-for-equity")',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),

    // Rich Content
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A brief summary (150-160 characters) shown in previews and search results',
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(160),
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'The main blog post content with rich formatting',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel'],
                    }),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab?',
                    initialValue: true,
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Link to',
                    to: [
                      { type: 'blogPost' },
                      { type: 'caseStudy' },
                      { type: 'service' },
                    ],
                  },
                ],
              },
            ],
          },
        },
        // Image block
        {
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true, // Allows editors to select focal point
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for accessibility and SEO',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption displayed below image',
            },
          ],
        },
        // Callout/Highlight block
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Callout Text',
              rows: 3,
            },
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                  { title: 'Tip', value: 'tip' },
                ],
              },
              initialValue: 'info',
            },
          ],
          preview: {
            select: {
              text: 'text',
              type: 'type',
            },
            prepare({ text, type }) {
              return {
                title: `${type.toUpperCase()}: ${text.substring(0, 50)}...`,
              }
            },
          },
        },
        // Video embed
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'YouTube, Vimeo, or other embeddable video URL',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Media
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image shown in post previews and social media shares',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Relationships
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description: 'The person who wrote this post',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: 'Main topics (select 1-2)',
      validation: (Rule) => Rule.max(2),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for search and filtering',
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      description: 'Suggest related articles (optional)',
      validation: (Rule) => Rule.max(3),
    }),

    // Publishing
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this post should be published (can schedule for future)',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isDraft',
      title: 'Draft Status',
      type: 'boolean',
      description: 'Check this box to keep the post as a draft (not visible on site)',
      initialValue: true,
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Optional: Customize how this appears in search engines',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Override the default title for search engines (50-60 characters)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Custom description for search results (150-160 characters)',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Focus Keywords',
          of: [{ type: 'string' }],
          description: 'Main keywords for SEO',
        },
        {
          name: 'noIndex',
          type: 'boolean',
          title: 'Hide from search engines',
          description: 'Prevent this page from appearing in search results',
          initialValue: false,
        },
      ],
    }),

    // Analytics
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time (auto-calculated, can override)',
      initialValue: 5,
    }),
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
      isDraft: 'isDraft',
    },
    prepare({ title, author, media, publishedAt, isDraft }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Not set'
      const status = isDraft ? '🟡 Draft' : '🟢 Published'

      return {
        title: title,
        subtitle: `${status} • ${author || 'No author'} • ${date}`,
        media: media,
      }
    },
  },

  // Ordering
  orderings: [
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date (oldest first)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})

/**
 * Category Schema (supporting schema for blog posts)
 */
export const categorySchema = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      description: 'Category color for visual organization',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
