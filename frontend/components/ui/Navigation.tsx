"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
          ? "bg-white/95 dark:bg-teal-800/95 backdrop-blur-md shadow-soft"
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
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/" className="flex items-center space-x-2 group">
              {/* Hexagon Logo Container - increased size to prevent node clipping */}
              <div className="relative" style={{ width: '64px', height: '64px' }}>
                {/* SVG for all hexagon elements - viewBox expanded to fit nodes */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="navHexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E07A5F" />
                      <stop offset="100%" stopColor="#F4A261" />
                    </linearGradient>
                  </defs>

                  {/* Outer hexagon outline (frame) - larger radius */}
                  {(() => {
                    const centerX = 32;
                    const centerY = 32;
                    const outerRadius = 26;
                    const innerRadius = 18;
                    const angles = [0, 60, 120, 180, 240, 300];

                    // Calculate outer hexagon points
                    const outerPoints = angles.map((angle) => {
                      const radians = (angle - 90) * (Math.PI / 180);
                      return {
                        x: centerX + Math.cos(radians) * outerRadius,
                        y: centerY + Math.sin(radians) * outerRadius,
                      };
                    });

                    // Calculate inner hexagon points
                    const innerPoints = angles.map((angle) => {
                      const radians = (angle - 90) * (Math.PI / 180);
                      return {
                        x: centerX + Math.cos(radians) * innerRadius,
                        y: centerY + Math.sin(radians) * innerRadius,
                      };
                    });

                    const outerPathD = outerPoints.map((point, i) =>
                      `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                    ).join(' ') + ' Z';

                    const innerPathD = innerPoints.map((point, i) =>
                      `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                    ).join(' ') + ' Z';

                    return (
                      <>
                        {/* Outer hexagon - subtle background stroke */}
                        <motion.path
                          d={outerPathD}
                          className={isScrolled ? 'stroke-terracotta/20' : 'stroke-white/20'}
                          strokeWidth="1.5"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                        />

                        {/* Outer hexagon - animated dashed stroke */}
                        <motion.path
                          d={outerPathD}
                          className={isScrolled ? 'stroke-terracotta/40' : 'stroke-white/40'}
                          strokeWidth="1.5"
                          strokeDasharray="4 3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                        />

                        {/* Node circles at outer hexagon vertices */}
                        {outerPoints.map((point, index) => (
                          <motion.circle
                            key={`node-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="3"
                            className={isScrolled ? 'fill-white stroke-terracotta/40' : 'fill-white stroke-white/40'}
                            strokeWidth="1"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.05, type: 'spring', stiffness: 400 }}
                          />
                        ))}

                        {/* Inner hexagon - gradient fill */}
                        <motion.path
                          d={innerPathD}
                          fill="url(#navHexGradient)"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                        />

                        {/* Inner hexagon - white stroke */}
                        <motion.path
                          d={innerPathD}
                          className={`${isScrolled ? 'stroke-white/50' : 'stroke-white/60'} group-hover:stroke-white transition-colors`}
                          strokeWidth="1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                        />
                      </>
                    );
                  })()}
                </svg>

                {/* Center circle with EQT text */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className="relative w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center">
                    {/* Pulsating ring */}
                    <motion.div
                      className="absolute rounded-full border-2 border-terracotta/30"
                      style={{ width: '32px', height: '32px' }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* EQT text - larger */}
                    <span className="text-terracotta font-bold text-[9px] tracking-[-0.03em] relative z-10">
                      EQT
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Brand text - geometric "by design" */}
              <div className="relative overflow-hidden">
                <motion.span
                  className={`font-sans text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                    isScrolled
                      ? "text-teal dark:text-cream-100 group-hover:text-terracotta"
                      : "text-white group-hover:text-coral"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  by design
                </motion.span>
                {/* Animated underline on hover */}
                <div
                  className={`absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ease-out ${
                    isScrolled ? "bg-terracotta" : "bg-coral"
                  }`}
                />
              </div>
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
                      ? "text-teal-700 dark:text-cream-200 hover:text-terracotta"
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

            {/* Dark Mode Toggle - Sun/Moon toggle button */}
            <motion.button
              onClick={toggleTheme}
              className={`relative p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-cream-200 hover:bg-teal-200 dark:hover:bg-teal-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Dark Mode Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? "text-teal dark:text-cream-200"
                  : "text-white"
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </motion.button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? "text-teal dark:text-cream-200" : "text-white"
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
        className="md:hidden bg-white dark:bg-teal-800 shadow-lg"
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
                    : "text-teal-700 dark:text-cream-200 hover:text-terracotta hover:bg-terracotta/5 dark:hover:bg-terracotta/10"
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
