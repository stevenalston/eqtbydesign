"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function TeamCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal to-teal-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-terracotta rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sage rounded-full blur-3xl" />
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
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-cream-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our team is ready to help you create meaningful, systemic change.
            Let's start a conversation about your goals.
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
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
