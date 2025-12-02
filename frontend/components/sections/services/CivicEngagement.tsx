'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const engagementCapabilities = [
  {
    title: 'Bringing Stakeholders Together',
    description: 'Convening diverse groups to ensure all perspectives are represented in the decision-making process.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Culturally Responsive Surveys',
    description: 'Designing and administering surveys that reach across language and cultural barriers to capture authentic voices.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Creating Focus Groups',
    description: 'Facilitating targeted discussions to gather in-depth qualitative insights from community members.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Deep Community Canvassing',
    description: 'Going door-to-door and building relationships within neighborhoods to reach those often unheard.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Specialized Engagement Designs',
    description: 'Custom methodologies tailored to unique community contexts and organizational needs.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    title: 'Listen, Reflect, Respond',
    description: 'Our signature approach that closes the feedback loop — ensuring community input leads to meaningful action.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
]

export default function CivicEngagement() {
  return (
    <section id="civic-engagement" className="py-24 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-64 bg-gradient-to-r from-sage/10 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Service number badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center text-xs font-bold">1</span>
            Service Area
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-display-md text-teal mb-6">
                Civic & Public Engagement
              </h2>
              <p className="text-xl text-teal-700 leading-relaxed">
                EQT By Design leads in creating inclusive and representative engagement for the public
                and community at large. We listen, learn, and reach out to ensure voices are lifted
                regardless of language, culture, zip code, class, status, ability, and/or the
                intersectionality of identity.
              </p>
            </div>

            {/* Engagement Model Visual */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-soft"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-serif text-lg text-teal mb-6 text-center">The EQT Engagement Model</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative" style={{ width: '240px', height: '240px' }}>
                  {/* SVG for hexagon lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 240 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Animated hexagon path connecting all nodes */}
                    {(() => {
                      const centerX = 120;
                      const centerY = 120;
                      const radius = 85;
                      const angles = [0, 60, 120, 180, 240, 300];

                      // Calculate all points
                      const points = angles.map((angle) => {
                        const radians = (angle - 90) * (Math.PI / 180);
                        return {
                          x: centerX + Math.cos(radians) * radius,
                          y: centerY + Math.sin(radians) * radius,
                        };
                      });

                      // Create path string for hexagon
                      const pathD = points.map((point, i) =>
                        `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                      ).join(' ') + ' Z';

                      return (
                        <>
                          {/* Background hexagon (subtle) */}
                          <motion.path
                            d={pathD}
                            stroke="rgba(129, 178, 154, 0.2)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                          />

                          {/* Animated hexagon outline */}
                          <motion.path
                            d={pathD}
                            stroke="rgba(129, 178, 154, 0.6)"
                            strokeWidth="2"
                            strokeDasharray="8 4"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                          />

                          {/* Lines from center to each node */}
                          {points.map((point, index) => (
                            <motion.line
                              key={`spoke-${index}`}
                              x1={centerX}
                              y1={centerY}
                              x2={point.x}
                              y2={point.y}
                              stroke="rgba(224, 122, 95, 0.3)"
                              strokeWidth="1"
                              strokeDasharray="4 4"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                            />
                          ))}
                        </>
                      );
                    })()}
                  </svg>

                  {/* Center circle - absolutely positioned in the center */}
                  <motion.div
                    className="absolute bg-gradient-to-br from-terracotta to-coral rounded-full flex items-center justify-center text-white text-center text-xs font-medium shadow-lg z-10"
                    style={{
                      width: '80px',
                      height: '80px',
                      left: '80px',
                      top: '80px',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span>Listen<br/>Reflect<br/>Respond</span>
                  </motion.div>

                  {/* Orbiting elements - positioned around the center */}
                  {[0, 60, 120, 180, 240, 300].map((angle, index) => {
                    const radius = 85;
                    const radians = (angle - 90) * (Math.PI / 180);
                    const x = Math.cos(radians) * radius;
                    const y = Math.sin(radians) * radius;

                    return (
                      <motion.div
                        key={angle}
                        className="absolute bg-white border-2 border-sage/40 rounded-full flex items-center justify-center shadow-sm z-10"
                        style={{
                          width: '36px',
                          height: '36px',
                          left: `calc(50% + ${x}px - 18px)`,
                          top: `calc(50% + ${y}px - 18px)`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 300 }}
                        whileHover={{
                          scale: 1.3,
                          borderColor: 'rgba(129, 178, 154, 0.8)',
                          backgroundColor: 'rgba(129, 178, 154, 0.2)'
                        }}
                      >
                        <span className="text-teal text-xs font-bold">{index + 1}</span>
                      </motion.div>
                    );
                  })}

                  {/* Animated pulse ring around center */}
                  <motion.div
                    className="absolute rounded-full border-2 border-terracotta/20"
                    style={{
                      width: '100px',
                      height: '100px',
                      left: '70px',
                      top: '70px',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-teal-600 text-center mt-4">
                Our hexagonal framework ensures comprehensive community coverage
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Capabilities grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-serif text-2xl text-teal mb-8 text-center">
            Six Core Engagement Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagementCapabilities.map((capability, index) => (
              <Card key={capability.title} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-terracotta/10 to-sage/10 flex items-center justify-center mb-4 text-terracotta"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {capability.icon}
                  </motion.div>

                  {/* Title */}
                  <h4 className="font-serif text-lg text-teal mb-2 group-hover:text-terracotta transition-colors">
                    {capability.title}
                  </h4>

                  {/* Description */}
                  <p className="text-teal-700 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </motion.div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
