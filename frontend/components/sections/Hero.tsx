"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal via-teal-600 to-sage">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-warm opacity-30 animate-gradient" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-50" />

      {/* Floating blurred shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-sage/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating hexagonal shapes */}
      <motion.svg
        className="absolute top-32 right-20 w-24 h-24 text-white/10"
        viewBox="0 0 100 100"
        fill="none"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-40 left-20 w-20 h-20 text-coral/15"
        viewBox="0 0 100 100"
        fill="none"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      {/* Floating circle outlines */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full border-2 border-white/10"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full border border-cream/15"
        animate={{
          scale: [1, 0.9, 1],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small hexagon near CTA area */}
      <motion.svg
        className="absolute top-1/2 right-10 w-12 h-12 text-sage/20"
        viewBox="0 0 100 100"
        fill="none"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="8 4"
          fill="none"
        />
      </motion.svg>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-cream-100 text-lg font-medium mb-6 tracking-wide uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Equity-Centered Strategic Planning
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-serif text-display-xl text-white mb-8 leading-tight text-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Creating Equity Through
            <br />
            <span className="gradient-text bg-gradient-to-r from-coral via-cream to-sage bg-clip-text text-transparent">
              Strategic Change
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-cream-100 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            25+ years of experience in equity-centered strategic planning,
            change management, and organizational cultural design within
            government, community, and corporate sectors.
          </motion.p>

          {/* CTAs with decorative accents */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* Decorative hexagon near primary button */}
            <motion.svg
              className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-terracotta/30 hidden sm:block"
              viewBox="0 0 100 100"
              fill="none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <polygon
                points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </motion.svg>

            <Button
              size="lg"
              variant="primary"
              href="/contact-us"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              }
            >
              Start a Conversation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-teal backdrop-blur-sm"
              href="/services"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              }
            >
              Explore Our Services
            </Button>

            {/* Decorative circle near secondary button */}
            <motion.div
              className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-sage/30 hidden sm:block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
            />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
          >
            <div className="flex flex-col items-center text-white/70">
              <span className="text-sm mb-2">Scroll to explore</span>
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
