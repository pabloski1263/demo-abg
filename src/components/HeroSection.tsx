"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: { text: string; link: string };
  ctaSecondary: { text: string; link: string };
  backgroundImage: string;
}

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary }: HeroSectionProps) {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 6 + 4,
    })),
  []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero z-10" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid z-10" />

      {/* Animated particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-gold-500/20 rounded-full z-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Ornamental lines */}
      <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent z-10 hidden lg:block" />
      <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent z-10 hidden lg:block" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-4xl">
          {/* Gold label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[4px] uppercase font-medium">ABG Estudio Jurídico</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] text-white mb-8"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={ctaPrimary.link}
              className="px-8 py-4 bg-gold-500 text-navy-900 font-medium rounded hover:bg-gold-400 transition-all duration-300 text-sm tracking-wide"
            >
              {ctaPrimary.text}
            </a>
            <a
              href={ctaSecondary.link}
              className="px-8 py-4 border border-white/20 text-white rounded hover:border-gold-500 hover:text-gold-500 transition-all duration-300 text-sm tracking-wide"
            >
              {ctaSecondary.text}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-500 tracking-[3px] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-6 bg-gold-500/50"
        />
      </motion.div>
    </section>
  );
}
