'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const teamMembers = [
  {
    name: 'Annette Miller',
    role: 'Founder + CEO',
    subtitle: 'For the People Engineer + Consultant on Equity, Engagement, Policy, Planning, Community & Wellbeing',
    bio: 'Annette has lived in Madison since 1989 and brings 25 years of strong professional policy and analytic skills, and a wide network of community, government, and business relationships. As CEO and founder of EQT By Design, her passion is ensuring that structural equity, inclusion and community voice and engagement are front and center in the work.',
    credentials: [
      'B.A. from UW-Madison (1992)',
      'M.A. in Social Innovation & Sustainability Leadership from Edgewood College (2017)',
      'Certified in International Association of Public Participation (IAP2)',
      'Certificate by Anima Deep Diversity',
    ],
    featured: true,
  },
  {
    name: 'Mathias Lemos',
    role: 'Community Engagement + Project Management Consultant',
    bio: 'Originally from Uruguay, Mathias has worked with numerous organizations alongside the Local Voices Network as their Partner Engagement Manager & Spanish Conversation Lead to amplify marginalized voices on a national level. He brings a strong community oriented background and knowledge on how to engage people, communities, and entities both locally and nationally.',
    credentials: [
      'Partner Engagement Manager',
      'Spanish Conversation Lead',
      'Community Facilitation Expert',
    ],
    featured: false,
  },
  {
    name: 'Stephan Hiroshi Gilchrist',
    role: 'Organizational and Strategic Systems Change',
    bio: 'Born in Japan and raised in a bi-racial and bi-cultural home, Stephan\'s previous roles include chief diversity officer and faculty of Social Innovation and Sustainability Leadership. Through relationship building, the understanding of self and others, and engaging powerful processes, Stephan sees that together, we can create equitable organizations and communities.',
    credentials: [
      'Former Chief Diversity Officer',
      'Founder, Center for Inclusive and Engaged Leadership',
      'Co-founder, Institute for Collective Wellbeing',
    ],
    featured: false,
  },
  {
    name: 'Matthew Braunginn',
    role: 'Communications + Policy Consultant',
    bio: 'A native Madisonian, Matthew is an experienced policy and community development analyst with expertise in racial and economic equity, climate change, and city infrastructure. He is well versed in distilling complex problems and solutions and presenting them in easy to understand packages.',
    credentials: [
      'B.A. in Political Science from Purdue University',
      'Policy Research & Writing Expert',
      'Communications Consultant',
    ],
    featured: false,
  },
  {
    name: 'Naman Siad',
    role: 'Project Coordinator Consultant',
    bio: 'A longtime Madison resident, Naman graduated from UW-Law School and received her L.L.M in Human Rights, Conflict, and Justice from SOAS University of London. Her research focused on transformational justice in post-conflict societies. She specializes in diversity, equity, and empathy training for organizations.',
    credentials: [
      'UW-Madison Law School Graduate',
      'L.L.M Human Rights, Conflict & Justice (SOAS London)',
      'Empathy 4 Equity Consultant',
    ],
    featured: false,
  },
  {
    name: 'Jennifer Smith',
    role: 'Social Media Consultant',
    bio: 'Jennifer is an accomplished professional with diverse communication, technology, and project management skills. She has a proven ability to research, assimilate and clearly communicate information across various digital platforms.',
    credentials: [
      'Digital Communications Expert',
      'Technology Integration Specialist',
      'Project Management Professional',
    ],
    featured: false,
  },
  {
    name: 'Catherine Barrance',
    role: 'EQT Logistics',
    bio: 'Since 2019, Catherine has partnered with EQT By Design through Rescue Desk Virtual Assistant Services. She oversees operational procedures, checklists, and protocols, making workflow run smoothly. She also provides design support for marketing pieces and report designs.',
    credentials: [
      'Project Manager (10+ years)',
      'Rescue Desk Virtual Assistant Services',
      'Operations & Design Support',
    ],
    featured: false,
  },
  {
    name: 'Sarah Zepnick',
    role: 'Data Marketing + CX Advisor',
    bio: 'Sarah brings experience in Corporate Customer Experience (CX) Strategy, Customer Journey Mapping, and Voice of Customer Analysis. With a Mathematics degree backing her work, she ensures metrics, measurement, and informed decision-making drive impactful storytelling.',
    credentials: [
      'B.S. in Mathematics',
      'CX Strategy Expert',
      'Voice of Customer Analysis',
    ],
    featured: false,
  },
]

export default function TeamMembers() {
  const founderMember = teamMembers.find(m => m.featured)
  const otherMembers = teamMembers.filter(m => !m.featured)

  return (
    <section className="py-24 bg-cream dark:bg-teal-900 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-l from-sage/10 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />

      {/* Floating hexagonal shapes */}
      <motion.svg
        className="absolute top-20 left-10 w-20 h-20 text-terracotta/10"
        viewBox="0 0 100 100"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ opacity: { delay: 0.5 }, y: { duration: 8, repeat: Infinity }, rotate: { duration: 10, repeat: Infinity } }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-40 right-20 w-16 h-16 text-sage/10"
        viewBox="0 0 100 100"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ opacity: { delay: 0.7 }, y: { duration: 12, repeat: Infinity }, rotate: { duration: 15, repeat: Infinity } }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      {/* Floating circle */}
      <motion.div
        className="absolute top-1/3 right-10 w-12 h-12 rounded-full border-2 border-coral/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ opacity: { delay: 0.6 }, scale: { duration: 6, repeat: Infinity } }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Founder Section */}
        {founderMember && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image placeholder */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-terracotta/30 rounded-full blur-xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-sage/30 rounded-full blur-xl" />

                  <div className="text-center p-8">
                    <div className="w-32 h-32 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-serif text-4xl font-bold">AM</span>
                    </div>
                    <p className="text-teal-600 text-sm">Photo coming soon</p>
                  </div>
                </div>

                {/* Accent shape */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-terracotta/20 rounded-full -z-10" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Leadership
                </div>

                <h2 className="font-serif text-display-sm text-teal dark:text-cream-100 mb-2">
                  {founderMember.name}
                </h2>
                <p className="text-terracotta dark:text-coral font-medium text-lg mb-4">
                  {founderMember.role}
                </p>
                <p className="text-teal-600 dark:text-cream-400 text-sm mb-6 italic">
                  {founderMember.subtitle}
                </p>

                <p className="text-teal-700 dark:text-cream-300 leading-relaxed mb-6">
                  {founderMember.bio}
                </p>

                {founderMember.credentials && (
                  <div>
                    <h4 className="text-teal dark:text-cream-100 font-semibold mb-3">Credentials</h4>
                    <ul className="space-y-2">
                      {founderMember.credentials.map((credential, idx) => (
                        <li key={idx} className="flex items-start text-sm text-teal-600 dark:text-cream-400">
                          <svg className="w-4 h-4 mr-2 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Team Members Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-serif text-2xl text-teal dark:text-cream-100 mb-8 text-center">
            Our Consultants & Partners
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherMembers.map((member, index) => (
              <Card key={member.name} className="group h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full flex flex-col"
                >
                  {/* Avatar placeholder */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-sage/30 to-terracotta/30 flex items-center justify-center mb-4 text-teal font-serif font-bold text-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </motion.div>

                  {/* Name & Role */}
                  <h4 className="font-serif text-lg text-teal dark:text-cream-100 mb-1 group-hover:text-terracotta transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-terracotta dark:text-coral text-sm font-medium mb-3">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-teal-700 dark:text-cream-300 text-sm leading-relaxed mb-4 flex-grow">
                    {member.bio}
                  </p>

                  {/* Credentials */}
                  {member.credentials && (
                    <ul className="space-y-1 pt-4 border-t border-sage/20">
                      {member.credentials.slice(0, 2).map((credential, idx) => (
                        <li key={idx} className="flex items-center text-xs text-teal-600 dark:text-cream-400">
                          <svg className="w-3 h-3 mr-2 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {credential}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
