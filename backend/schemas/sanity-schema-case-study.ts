/**
 * Case Study Schema for Sanity CMS
 * Equity by Design Website
 *
 * Comprehensive schema for showcasing client work with:
 * - Project details and challenges
 * - Approach and methodology
 * - Solutions and deliverables
 * - Impact metrics and outcomes
 * - Rich media gallery
 * - Client testimonials
 */

import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export default defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  icon: CaseIcon,

  groups: [
    { name: 'overview', title: 'Overview' },
    { name: 'challenge', title: 'The Challenge' },
    { name: 'approach', title: 'Our Approach' },
    { name: 'solution', title: 'The Solution' },
    { name: 'impact', title: 'Impact & Results' },
    { name: 'media', title: 'Media & Assets' },
    { name: 'seo', title: 'SEO & Settings' },
  ],

  fields: [
    // OVERVIEW GROUP
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'A compelling name for this case study',
      group: 'overview',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'One-sentence summary (shown in previews)',
      rows: 2,
      group: 'overview',
      validation: (Rule) => Rule.required().max(160),
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'object',
      group: 'overview',
      fields: [
        {
          name: 'name',
          title: 'Client Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'industry',
          title: 'Industry',
          type: 'string',
          options: {
            list: [
              { title: 'Nonprofit - Education', value: 'nonprofit-education' },
              { title: 'Nonprofit - Health', value: 'nonprofit-health' },
              { title: 'Nonprofit - Social Justice', value: 'nonprofit-justice' },
              { title: 'Nonprofit - Environment', value: 'nonprofit-environment' },
              { title: 'Nonprofit - Arts & Culture', value: 'nonprofit-arts' },
              { title: 'Corporate - Technology', value: 'corporate-tech' },
              { title: 'Corporate - Finance', value: 'corporate-finance' },
              { title: 'Corporate - Healthcare', value: 'corporate-healthcare' },
              { title: 'Government', value: 'government' },
              { title: 'Foundation', value: 'foundation' },
              { title: 'Other', value: 'other' },
            ],
          },
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'City, State or Region',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
        {
          name: 'logo',
          title: 'Client Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'overview',
      options: {
        list: [
          { title: 'Brand Identity', value: 'brand-identity' },
          { title: 'Website Design & Development', value: 'web-development' },
          { title: 'UX/UI Design', value: 'ux-ui' },
          { title: 'Content Strategy', value: 'content-strategy' },
          { title: 'Digital Marketing', value: 'digital-marketing' },
          { title: 'Social Impact Campaign', value: 'impact-campaign' },
          { title: 'Data Visualization', value: 'data-viz' },
          { title: 'Accessibility Audit', value: 'accessibility' },
          { title: 'DEI Initiative', value: 'dei' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'timeline',
      title: 'Project Timeline',
      type: 'object',
      group: 'overview',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
        },
        {
          name: 'duration',
          title: 'Duration',
          type: 'string',
          description: 'E.g., "3 months", "6 weeks"',
        },
      ],
    }),

    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      description: 'Highlight this on the homepage and portfolio page',
      group: 'overview',
      initialValue: false,
    }),

    // CHALLENGE GROUP
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'object',
      group: 'challenge',
      fields: [
        {
          name: 'overview',
          title: 'Challenge Overview',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading 3', value: 'h3' },
                { title: 'Quote', value: 'blockquote' },
              ],
            },
          ],
          description: 'Describe the problem or opportunity the client faced',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'painPoints',
          title: 'Key Pain Points',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'point', type: 'string', title: 'Pain Point' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
              preview: {
                select: { title: 'point', subtitle: 'description' },
              },
            },
          ],
        },
        {
          name: 'context',
          title: 'Background Context',
          type: 'text',
          rows: 4,
          description: 'Additional context about the situation',
        },
        {
          name: 'challengeImage',
          title: 'Challenge Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required() },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),

    // APPROACH GROUP
    defineField({
      name: 'approach',
      title: 'Our Approach',
      type: 'object',
      group: 'approach',
      fields: [
        {
          name: 'methodology',
          title: 'Methodology Overview',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'How we approached solving the challenge',
        },
        {
          name: 'processSteps',
          title: 'Process Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'stepNumber', type: 'number', title: 'Step Number' },
                { name: 'title', type: 'string', title: 'Step Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon',
                  description: 'Icon name (for visual representation)',
                  options: {
                    list: [
                      { title: 'Research', value: 'research' },
                      { title: 'Strategy', value: 'strategy' },
                      { title: 'Design', value: 'design' },
                      { title: 'Development', value: 'development' },
                      { title: 'Testing', value: 'testing' },
                      { title: 'Launch', value: 'launch' },
                    ],
                  },
                },
              ],
              preview: {
                select: {
                  stepNumber: 'stepNumber',
                  title: 'title',
                },
                prepare({ stepNumber, title }) {
                  return {
                    title: `Step ${stepNumber}: ${title}`,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'collaboration',
          title: 'Team & Collaboration',
          type: 'object',
          fields: [
            {
              name: 'internalTeam',
              type: 'array',
              title: 'Internal Team',
              of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
            },
            {
              name: 'clientStakeholders',
              type: 'string',
              title: 'Client Stakeholders',
              description: 'Who we worked with on the client side',
            },
          ],
        },
      ],
    }),

    // SOLUTION GROUP
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'object',
      group: 'solution',
      fields: [
        {
          name: 'overview',
          title: 'Solution Overview',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Describe what was created/delivered',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'deliverables',
          title: 'Key Deliverables',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Deliverable Name' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
              preview: {
                select: { title: 'name', subtitle: 'description' },
              },
            },
          ],
        },
        {
          name: 'features',
          title: 'Notable Features',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Bullet points of standout features',
        },
      ],
    }),

    // IMPACT GROUP
    defineField({
      name: 'impact',
      title: 'Impact & Results',
      type: 'object',
      group: 'impact',
      fields: [
        {
          name: 'overview',
          title: 'Impact Overview',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Narrative about the outcomes and impact',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'metrics',
          title: 'Impact Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'metric', type: 'string', title: 'Metric Name', description: 'E.g., "Website Traffic"' },
                { name: 'value', type: 'string', title: 'Value', description: 'E.g., "250%"' },
                { name: 'change', type: 'string', title: 'Change Direction', options: { list: ['increase', 'decrease', 'neutral'] } },
                { name: 'context', type: 'string', title: 'Context', description: 'E.g., "increase in first 3 months"' },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon Type',
                  options: {
                    list: [
                      { title: 'Users/People', value: 'users' },
                      { title: 'Growth/Chart', value: 'growth' },
                      { title: 'Engagement/Heart', value: 'engagement' },
                      { title: 'Revenue/Dollar', value: 'revenue' },
                      { title: 'Time/Clock', value: 'time' },
                      { title: 'Custom', value: 'custom' },
                    ],
                  },
                },
              ],
              preview: {
                select: {
                  metric: 'metric',
                  value: 'value',
                  change: 'change',
                },
                prepare({ metric, value, change }) {
                  const arrow = change === 'increase' ? '↑' : change === 'decrease' ? '↓' : '→'
                  return {
                    title: `${metric}: ${value} ${arrow}`,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1).max(6),
        },
        {
          name: 'testimonial',
          title: 'Client Testimonial',
          type: 'object',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote', rows: 4 },
            { name: 'author', type: 'string', title: 'Author Name' },
            { name: 'role', type: 'string', title: 'Author Role/Title' },
            {
              name: 'photo',
              type: 'image',
              title: 'Author Photo',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text' },
              ],
            },
          ],
        },
        {
          name: 'longTermImpact',
          title: 'Long-Term Impact',
          type: 'text',
          rows: 3,
          description: 'Describe sustained outcomes (if applicable)',
        },
      ],
    }),

    // MEDIA GROUP
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'media',
      description: 'Main featured image for the case study',
      options: {
        hotspot: true,
      },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required() },
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'order', type: 'number', title: 'Display Order' },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),

    defineField({
      name: 'beforeAfter',
      title: 'Before/After Comparison',
      type: 'object',
      group: 'media',
      fields: [
        {
          name: 'before',
          type: 'image',
          title: 'Before Image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
        {
          name: 'after',
          type: 'image',
          title: 'After Image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
        {
          name: 'description',
          type: 'string',
          title: 'Comparison Description',
        },
      ],
    }),

    defineField({
      name: 'videos',
      title: 'Project Videos',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Video Title' },
            { name: 'url', type: 'url', title: 'Video URL', description: 'YouTube, Vimeo, etc.' },
            { name: 'thumbnail', type: 'image', title: 'Custom Thumbnail (optional)' },
          ],
          preview: {
            select: { title: 'title', media: 'thumbnail' },
          },
        },
      ],
    }),

    // SEO & SETTINGS GROUP
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'seo',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'isDraft',
      title: 'Draft Status',
      type: 'boolean',
      group: 'seo',
      initialValue: true,
    }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Custom image for social media (defaults to hero image)',
        },
      ],
    }),

    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      group: 'seo',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      client: 'client.name',
      media: 'heroImage',
      featured: 'featured',
      isDraft: 'isDraft',
    },
    prepare({ title, client, media, featured, isDraft }) {
      const status = isDraft ? '🟡 Draft' : '🟢 Published'
      const star = featured ? '⭐ ' : ''

      return {
        title: `${star}${title}`,
        subtitle: `${status} • ${client || 'No client'}`,
        media: media,
      }
    },
  },

  orderings: [
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
    {
      title: 'Client Name (A-Z)',
      name: 'clientAsc',
      by: [{ field: 'client.name', direction: 'asc' }],
    },
  ],
})
