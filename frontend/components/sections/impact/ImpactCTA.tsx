"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function ImpactCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal to-teal-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-coral rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-sage rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-display-sm text-white mb-6">
            Ready to Create Your Impact Story?
          </h2>
          <p className="text-xl text-cream-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's partner together to create meaningful, systemic change in your
            organization and community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
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
              variant="outline"
              size="lg"
              href="/services"
              className="bg-transparent border-white text-white hover:bg-white hover:text-teal"
            >
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
