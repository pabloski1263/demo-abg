"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import CardStack from "./CardStack";
import type { HeroCard } from "@/lib/content";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: { text: string; link: string };
  ctaSecondary: { text: string; link: string };
  backgroundImage: string;
  cards: HeroCard[];
}

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary, cards }: HeroSectionProps) {
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 6 + 4,
    })),
  []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero z-10" />
      <div className="absolute inset-0 bg-grid z-10" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-gold-500/20 rounded-full z-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Ornamental lines */}
      <div className="absolute left-8 top-[15%] bottom-[40%] w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent z-10 hidden lg:block" />
      <div className="absolute right-8 top-[15%] bottom-[40%] w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent z-10 hidden lg:block" />

      {/* Content - stacked layout: text above, cards below */}
      <div className="relative z-20 w-full pt-28 pb-4 flex flex-col min-h-screen">
        {/* Top: Text section - takes roughly half the hero */}
        <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex items-center">
          <div className="w-full max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-gold-500 text-sm tracking-[4px] uppercase font-medium">ABG Estudio Jurídico</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] text-white mb-5 max-w-4xl"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-gray-300 leading-relaxed mb-7 max-w-2xl"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={ctaPrimary.link}
                className="px-7 py-3.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 transition-all duration-300 text-sm tracking-wide shadow-lg shadow-gold-500/20"
              >
                {ctaPrimary.text}
              </a>
              <a
                href={ctaSecondary.link}
                className="px-7 py-3.5 border border-white/20 text-white rounded-lg hover:border-gold-500 hover:text-gold-500 transition-all duration-300 text-sm tracking-wide"
              >
                {ctaSecondary.text}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom: CardStack - compact, fans out from below */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full px-6"
        >
          <div className="max-w-5xl mx-auto">
            <CardStack
              items={cards}
              autoAdvance
              intervalMs={3500}
              pauseOnHover
              showDots={cards.length > 1}
              cardWidth={340}
              cardHeight={220}
              overlap={0.2}
              spreadDeg={30}
              depthPx={70}
              activeScale={1.05}
              inactiveScale={0.92}
              activeLiftPx={-10}
              tiltXDeg={8}
              maxVisible={7}
              springStiffness={300}
              springDamping={25}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] text-gray-500 tracking-[3px] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-5 bg-gold-500/50"
        />
      </motion.div>
    </section>
  );
}
