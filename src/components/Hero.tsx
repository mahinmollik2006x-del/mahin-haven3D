import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';

const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden">
      {/* 3D scene backdrop */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-950" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,20,29,0.7)_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-2 mb-6"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-gold-300 text-gold-300" />
          ))}
          <span className="ml-2 text-xs tracking-ultra uppercase text-sand-100/70">
            Five-Star Oceanfront Resort
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.95] text-balance"
        >
          Where the Sky
          <br />
          <span className="gold-gradient-text italic">Meets the Sea</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 max-w-xl text-base sm:text-lg text-sand-100/80 leading-relaxed"
        >
          An intimate sanctuary suspended above the azure tide — golden light, crystalline waters, and moments that linger long after the sun has set.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#booking"
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-medium tracking-wide overflow-hidden transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Book Your Escape</span>
            <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
          </a>
          <a
            href="#rooms"
            className="px-8 py-4 rounded-full border border-sand-100/30 text-sand-50 tracking-wide hover:border-gold-300 hover:text-gold-200 transition-colors"
          >
            Explore Suites
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-sand-100/60"
      >
        <span className="text-[10px] tracking-ultra uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
