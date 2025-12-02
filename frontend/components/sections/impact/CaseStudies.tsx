'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { HexagonOutline } from '@/components/ui/DecorativeShape'

const caseStudies = [
  {
    title: "Let's Talk Streets: Complete Green Streets",
    category: 'Civic & Public Engagement',
    award: '2023 APA Wisconsin Award',
    description: 'Led community engagement efforts for the City of Madison\'s Complete Green Streets plan, incorporating insights from deep community engagement and integrating community-oriented equity into street design.',
    outcomes: [
      'Engaged 789 community members through surveys',
      'Established Equity Priority Areas (EPAs)',
      'Created equity Sphere of Impact decision-making process',
      'Plan adopted by city council in early 2023',
    ],
    highlights: [
      '202 respondents (first survey)',
      '527 respondents (second survey)',
      '60 participants (disability-focused)',
      '71 people in listening sessions',
    ],
    color: 'terracotta',
  },
  {
    title: 'Fitchburg Teen Center',
    category: 'Community Engagement',
    description: 'Working with the City of Fitchburg and teen interns leading the development of designs for a Teen Center. Teen interns engaged their peers directly—centering youth voices in community-based projects.',
    outcomes: [
      '390 combined survey respondents',
      '214 teen respondents engaged',
      '81 focus group participants',
      'Unique engagement with juvenile detention teens',
    ],
    highlights: [
      '8 teen interns helped design engagements',
      '4 focus group sessions conducted',
      '58 teen participants in focus groups',
      'Feasibility study now in Phase 2',
    ],
    color: 'sage',
  },
  {
    title: 'Triangle Redevelopment Project',
    category: 'Housing & Community',
    description: 'Engaged residents living in the Triangle—a historic affordable housing neighborhood in Madison\'s Southwest side—on their vision for redevelopment, building trust through consistent presence and community ambassadors.',
    outcomes: [
      '413 total survey responses collected',
      'Building-by-building engagement sessions',
      'Community Ambassador program established',
      'Decision-making model from resident input',
    ],
    highlights: [
      '102 Triangle residents (pre-design)',
      '87 community residents (pre-design)',
      '224 Triangle residents (full engagement)',
      'Community Picnic for relationship building',
    ],
    color: 'teal',
  },
  {
    title: "John Nolen Drive: Madison's Gateway",
    category: 'Urban Planning',
    description: 'Coordinating two major projects—the John Nolen Drive Reconstruction Project and the Madison LakeWay Project—to create a premier gateway and lakefront for Madison with community voices included every step.',
    outcomes: [
      'Over 10 years of community engagement',
      'Coordination between multiple city projects',
      'Community voices centered throughout',
      'Creating premier gateway and lakefront',
    ],
    highlights: [
      'John Nolen Drive Reconstruction',
      'Madison LakeWay Project',
      'Lake Monona Waterfront integration',
      'Partnership with KL Engineering',
    ],
    color: 'coral',
  },
]

export default function CaseStudies() {
  return (
    <section className="py-24 bg-white dark:bg-teal-800 relative overflow-hidden">
      {/* Background decorative shapes */}
      <motion.svg
        className="absolute top-20 right-10 w-24 h-24 text-terracotta/5"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      <motion.div
        className="absolute bottom-40 left-10 w-20 h-20 rounded-full border-2 border-sage/10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.svg
        className="absolute top-1/2 left-20 w-16 h-16 text-sage/5"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <HexagonOutline size="sm" color="terracotta" className="opacity-30" />
            <h2 className="font-serif text-display-md text-teal dark:text-cream-100">
              Featured Projects
            </h2>
            <HexagonOutline size="sm" color="sage" className="opacity-30" />
          </div>
          <p className="text-xl text-teal-700 dark:text-cream-200 max-w-3xl mx-auto leading-relaxed">
            Real stories of transformation across Madison and beyond. See how we've partnered
            with communities to create meaningful, systemic change.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={study.title} className="group h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full flex flex-col"
              >
                {/* Header with badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    study.color === 'terracotta' ? 'bg-terracotta/10 text-terracotta' :
                    study.color === 'sage' ? 'bg-sage/10 text-sage' :
                    study.color === 'coral' ? 'bg-coral/10 text-coral' :
                    'bg-teal/10 text-teal'
                  }`}>
                    {study.category}
                  </span>
                  {study.award && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {study.award}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl text-teal dark:text-cream-100 mb-3 group-hover:text-terracotta transition-colors">
                  {study.title}
                </h3>

                {/* Description */}
                <p className="text-teal-700 dark:text-cream-300 text-sm leading-relaxed mb-4">
                  {study.description}
                </p>

                {/* Two columns: Outcomes & Highlights */}
                <div className="grid md:grid-cols-2 gap-4 flex-grow">
                  {/* Key Outcomes */}
                  <div className="pt-4 border-t border-sage/20 dark:border-teal-600">
                    <h4 className="text-xs font-semibold text-teal dark:text-cream-100 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {study.outcomes.slice(0, 3).map((outcome, idx) => (
                        <li key={idx} className="flex items-start text-xs text-teal-600 dark:text-cream-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 mr-2 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* By the Numbers */}
                  <div className="pt-4 border-t border-sage/20 dark:border-teal-600">
                    <h4 className="text-xs font-semibold text-teal dark:text-cream-100 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Highlights
                    </h4>
                    <ul className="space-y-2">
                      {study.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-xs text-teal-600 dark:text-cream-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
