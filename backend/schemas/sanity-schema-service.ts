/**
 * Service Schema for Sanity CMS
 * Equity by Design Website
 *
 * Comprehensive service offerings with:
 * - Service details and descriptions
 * - Process steps and methodology
 * - Capabilities and deliverables
 * - Pricing information (optional)
 * - Related case studies
 */

import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: PackageIcon,

  groups: [
    { name: 'overview', title: 'Overview' },
    { name: 'details', title: 'Details' },
    { name: 'process', title: 'Process' },
    { name: 'pricing', title: 'Pricing' },
    { name: 'seo', title: 'SEO & Settings' },
  ],

  fields: [
    // OVERVIEW GROUP
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      description: 'E.g., "Brand Identity Design", "Website Development"',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short, compelling one-liner (shown in service cards)',
      group: 'overview',
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief overview of the service (1-2 sentences)',
      rows: 3,
      group: 'overview',
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier for visual representation',
      group: 'overview',
      options: {
        list: [
          { title: 'Palette (Brand Identity)', value: 'palette' },
          { title: 'Code (Web Development)', value: 'code' },
          { title: 'Layout (UX/UI Design)', value: 'layout' },
          { title: 'Megaphone (Marketing)', value: 'megaphone' },
          { title: 'Edit (Content Strategy)', value: 'edit' },
          { title: 'Chart (Data Visualization)', value: 'chart' },
          { title: 'Users (Community Building)', value: 'users' },
          { title: 'Shield (Accessibility)', value: 'shield' },
        ],
      },
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'overview',
      description: 'Hero image for the service page',
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
    }),

    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Design', value: 'design' },
          { title: 'Development', value: 'development' },
          { title: 'Strategy', value: 'strategy' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Consulting', value: 'consulting' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Display prominently on services overview',
      group: 'overview',
      initialValue: false,
    }),

    // DETAILS GROUP
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required() },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
      description: 'Detailed explanation of the service',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'idealFor',
      title: 'Ideal For',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      description: 'Who is this service best suited for? (e.g., "Nonprofits launching new initiatives")',
      validation: (Rule) => Rule.min(2).max(5),
    }),

    defineField({
      name: 'capabilities',
      title: 'Key Capabilities',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'capability', type: 'string', title: 'Capability Name' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: {
            select: {
              title: 'capability',
              subtitle: 'description',
            },
          },
        },
      ],
      description: 'Specific things you can do within this service',
    }),

    defineField({
      name: 'deliverables',
      title: 'Typical Deliverables',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Deliverable Name' },
            { name: 'description', type: 'string', title: 'Brief Description' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'description' },
          },
        },
      ],
      description: 'What clients can expect to receive',
    }),

    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      description: 'Value propositions and outcomes',
      validation: (Rule) => Rule.min(3).max(6),
    }),

    // PROCESS GROUP
    defineField({
      name: 'processOverview',
      title: 'Process Overview',
      type: 'text',
      group: 'process',
      rows: 3,
      description: 'Introduction to your methodology for this service',
    }),

    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      group: 'process',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepNumber',
              type: 'number',
              title: 'Step Number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Step Title',
              description: 'E.g., "Discovery & Research"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
              description: 'What happens in this step',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'duration',
              type: 'string',
              title: 'Typical Duration',
              description: 'E.g., "1-2 weeks"',
            },
            {
              name: 'activities',
              type: 'array',
              title: 'Key Activities',
              of: [{ type: 'string' }],
              description: 'Specific tasks or milestones in this step',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: 'Search (Discovery)', value: 'search' },
                  { title: 'Lightbulb (Ideation)', value: 'lightbulb' },
                  { title: 'Pencil (Design)', value: 'pencil' },
                  { title: 'Code (Development)', value: 'code' },
                  { title: 'Clipboard (Testing)', value: 'clipboard' },
                  { title: 'Rocket (Launch)', value: 'rocket' },
                ],
              },
            },
          ],
          preview: {
            select: {
              stepNumber: 'stepNumber',
              title: 'title',
              duration: 'duration',
            },
            prepare({ stepNumber, title, duration }) {
              return {
                title: `Step ${stepNumber}: ${title}`,
                subtitle: duration || '',
              }
            },
          },
        },
      ],
      description: 'Step-by-step breakdown of the process',
      validation: (Rule) => Rule.min(3).max(8),
    }),

    defineField({
      name: 'timeline',
      title: 'Typical Timeline',
      type: 'object',
      group: 'process',
      fields: [
        {
          name: 'minimum',
          type: 'string',
          title: 'Minimum Duration',
          description: 'E.g., "4 weeks"',
        },
        {
          name: 'typical',
          type: 'string',
          title: 'Typical Duration',
          description: 'E.g., "8-12 weeks"',
        },
        {
          name: 'notes',
          type: 'text',
          title: 'Timeline Notes',
          rows: 2,
          description: 'Factors that affect timeline',
        },
      ],
    }),

    // PRICING GROUP
    defineField({
      name: 'pricingModel',
      title: 'Pricing Model',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'Fixed Price', value: 'fixed' },
          { title: 'Hourly Rate', value: 'hourly' },
          { title: 'Retainer', value: 'retainer' },
          { title: 'Value-Based', value: 'value-based' },
          { title: 'Custom Quote', value: 'custom' },
        ],
      },
    }),

    defineField({
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'string',
      group: 'pricing',
      description: 'E.g., "$5,000" or "Contact for pricing"',
    }),

    defineField({
      name: 'pricingDetails',
      title: 'Pricing Details',
      type: 'text',
      group: 'pricing',
      rows: 4,
      description: 'Additional context about pricing (optional)',
    }),

    defineField({
      name: 'packages',
      title: 'Service Packages',
      type: 'array',
      group: 'pricing',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Package Name', description: 'E.g., "Essential", "Premium"' },
            { name: 'price', type: 'string', title: 'Price', description: 'E.g., "$10,000"' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'features', type: 'array', title: 'Included Features', of: [{ type: 'string' }] },
            { name: 'recommended', type: 'boolean', title: 'Recommended Package', initialValue: false },
          ],
          preview: {
            select: {
              name: 'name',
              price: 'price',
              recommended: 'recommended',
            },
            prepare({ name, price, recommended }) {
              return {
                title: recommended ? `⭐ ${name}` : name,
                subtitle: price,
              }
            },
          },
        },
      ],
    }),

    // RELATED CONTENT
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      group: 'details',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      description: 'Showcase examples of this service in action',
      validation: (Rule) => Rule.max(4),
    }),

    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer', rows: 3 },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),

    // SEO & SETTINGS GROUP
    defineField({
      name: 'isActive',
      title: 'Active Service',
      type: 'boolean',
      group: 'seo',
      description: 'Uncheck to hide from website (e.g., if temporarily unavailable)',
      initialValue: true,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'seo',
      description: 'Order on services page (lower numbers first)',
      initialValue: 50,
      validation: (Rule) => Rule.min(1),
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
          name: 'keywords',
          type: 'array',
          title: 'Focus Keywords',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],

  preview: {
    select: {
      name: 'name',
      category: 'category',
      featured: 'featured',
      isActive: 'isActive',
      media: 'featuredImage',
    },
    prepare({ name, category, featured, isActive, media }) {
      const status = isActive ? '🟢' : '🔴'
      const star = featured ? '⭐ ' : ''

      return {
        title: `${status} ${star}${name}`,
        subtitle: category || 'Uncategorized',
        media: media,
      }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'displayOrder', direction: 'asc' },
      ],
    },
  ],
})
