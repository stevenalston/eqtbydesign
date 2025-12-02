"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Our Impact", href: "/impact" },
    { name: "Team", href: "/team" },
    { name: "Latest", href: "/latest" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-warm rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span
                className={`font-serif font-bold text-xl ${
                  isScrolled ? "text-teal" : "text-white"
                }`}
              >
                Equity by Design
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActiveLink(link.href)
                      ? "text-terracotta"
                      : isScrolled
                      ? "text-teal-700 hover:text-terracotta"
                      : "text-white hover:text-coral"
                  }`}
                >
                  <motion.span
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
                {/* Animated underline */}
                <motion.div
                  className={`absolute -bottom-1 left-0 h-0.5 ${
                    isScrolled ? "bg-terracotta" : "bg-coral"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      isActiveLink(link.href) || hoveredLink === link.href
                        ? "100%"
                        : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
                {/* Active dot indicator */}
                {isActiveLink(link.href) && (
                  <motion.div
                    className="absolute -bottom-3 left-1/2 w-1 h-1 rounded-full bg-terracotta"
                    initial={{ scale: 0, x: "-50%" }}
                    animate={{ scale: 1, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  />
                )}
              </motion.div>
            ))}
            <Button size="sm" variant="primary" href="/contact-us">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? "text-teal" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden bg-white shadow-lg"
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={link.href}
                className={`block py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveLink(link.href)
                    ? "text-terracotta bg-terracotta/10"
                    : "text-teal-700 hover:text-terracotta hover:bg-terracotta/5"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.span
                  className="flex items-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  {isActiveLink(link.href) && (
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-terracotta"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                  {link.name}
                </motion.span>
              </Link>
            </motion.div>
          ))}
          <Button
            size="sm"
            variant="primary"
            className="w-full"
            href="/contact-us"
          >
            Contact Us
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
