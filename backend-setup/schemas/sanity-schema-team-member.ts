/**
 * Team Member Schema for Sanity CMS
 * Equity by Design Website
 *
 * Manages team profiles with:
 * - Professional information
 * - Bio and expertise
 * - Social links
 * - Profile images
 * - Project associations
 */

import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: UsersIcon,

  fields: [
    // Basic Information
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Team member\'s full name',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'role',
      title: 'Job Title/Role',
      type: 'string',
      description: 'E.g., "Lead Designer", "Creative Director"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Leadership', value: 'leadership' },
          { title: 'Design', value: 'design' },
          { title: 'Development', value: 'development' },
          { title: 'Strategy', value: 'strategy' },
          { title: 'Content', value: 'content' },
          { title: 'Operations', value: 'operations' },
        ],
      },
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (leadership typically 1-10, staff 11+)',
      validation: (Rule) => Rule.required().min(1),
      initialValue: 50,
    }),

    // Visual
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      description: 'Professional headshot (square crop recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'E.g., "Headshot of [Name]"',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Bio & Expertise
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      description: 'One-sentence summary (shown in team grid)',
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
    }),

    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Detailed biography (shown on individual profile pages)',
    }),

    defineField({
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key skills and specialties',
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.max(8),
    }),

    defineField({
      name: 'quote',
      title: 'Personal Quote',
      type: 'text',
      description: 'Optional: A personal mantra or philosophy',
      rows: 2,
    }),

    // Experience & Education
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Total years in the field',
    }),

    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'degree', type: 'string', title: 'Degree/Certification' },
            { name: 'institution', type: 'string', title: 'Institution' },
            { name: 'year', type: 'string', title: 'Year' },
          ],
          preview: {
            select: {
              degree: 'degree',
              institution: 'institution',
            },
            prepare({ degree, institution }) {
              return {
                title: degree,
                subtitle: institution,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Award Title' },
            { name: 'organization', type: 'string', title: 'Awarding Organization' },
            { name: 'year', type: 'string', title: 'Year' },
          ],
          preview: {
            select: {
              title: 'title',
              year: 'year',
            },
            prepare({ title, year }) {
              return {
                title: title,
                subtitle: year,
              }
            },
          },
        },
      ],
    }),

    // Contact & Social
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'email',
      description: 'Public contact email (optional)',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      description: 'Professional social media profiles',
      fields: [
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
          description: 'Full URL to LinkedIn profile',
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter/X',
          description: 'Full URL to Twitter profile',
        },
        {
          name: 'dribbble',
          type: 'url',
          title: 'Dribbble',
          description: 'Full URL to Dribbble profile',
        },
        {
          name: 'behance',
          type: 'url',
          title: 'Behance',
          description: 'Full URL to Behance profile',
        },
        {
          name: 'website',
          type: 'url',
          title: 'Personal Website',
          description: 'Portfolio or personal site',
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),

    // Work-Related
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
      description: 'E.g., "she/her", "he/him", "they/them"',
      options: {
        list: [
          { title: 'she/her', value: 'she/her' },
          { title: 'he/him', value: 'he/him' },
          { title: 'they/them', value: 'they/them' },
          { title: 'Custom', value: 'custom' },
        ],
      },
    }),

    defineField({
      name: 'isActive',
      title: 'Active Team Member',
      type: 'boolean',
      description: 'Uncheck to hide from team page (for alumni)',
      initialValue: true,
    }),

    defineField({
      name: 'joinDate',
      title: 'Join Date',
      type: 'date',
      description: 'When they joined the team',
    }),

    // Additional Info
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Languages the team member speaks',
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'interests',
      title: 'Personal Interests',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Hobbies, causes, or interests (humanizes the profile)',
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'favoriteProject',
      title: 'Favorite Project',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
      description: 'Link to their favorite project to showcase',
    }),

    // Meta
    defineField({
      name: 'meta',
      title: 'Metadata',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title (SEO)',
          description: 'Override default (defaults to name + role)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description (SEO)',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],

  preview: {
    select: {
      name: 'name',
      role: 'role',
      photo: 'photo',
      isActive: 'isActive',
      displayOrder: 'displayOrder',
    },
    prepare({ name, role, photo, isActive, displayOrder }) {
      const status = isActive ? '🟢' : '🔴'

      return {
        title: `${status} ${name}`,
        subtitle: `${role} • Order: ${displayOrder}`,
        media: photo,
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
      title: 'Join Date (newest first)',
      name: 'joinDateDesc',
      by: [{ field: 'joinDate', direction: 'desc' }],
    },
  ],
})
