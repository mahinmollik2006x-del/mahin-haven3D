import { motion } from 'framer-motion';
import { Waves, UtensilsCrossed, Dumbbell, Sparkles, Plane, Wine } from 'lucide-react';

const amenities = [
  { icon: Waves, label: 'Private Beach' },
  { icon: UtensilsCrossed, label: 'Ocean-to-Table Dining' },
  { icon: Wine, label: 'Cellar & Tasting Room' },
  { icon: Dumbbell, label: 'Wellness Pavilion' },
  { icon: Sparkles, label: 'Full-Service Spa' },
  { icon: Plane, label: 'Helipad Transfers' },
];

export default function Experiences() {
  return (
    <section id="experiences" className="relative py-32 md:py-44 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/60 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs tracking-ultra uppercase text-gold-300">Experiences</span>
            <h2 className="mt-5 font-display text-5xl md:text-6xl text-white leading-tight">
              Days that drift, <br /> nights that <span className="gold-gradient-text italic">glow</span>
            </h2>
            <p className="mt-6 text-sand-100/70 text-lg leading-relaxed max-w-md">
              From sunrise yoga on the deck to candlelit dinners harvested from the day's catch, every moment at Mahin Haven is composed, never rushed.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5">
              {amenities.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-azure-500/10 text-azure-200 group-hover:bg-gold-400/15 group-hover:text-gold-300 transition-colors">
                    <a.icon size={18} />
                  </span>
                  <span className="text-sm text-sand-100/80">{a.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Parallax stacked visuals */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[520px]"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              className="absolute top-0 right-0 w-3/4 h-64 rounded-3xl overflow-hidden border border-gold-400/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-azure-400/40 via-azure-700/50 to-ink-950" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,233,207,0.5),transparent_40%)]" />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-ink-950 to-transparent" />
              <span className="absolute bottom-4 left-5 font-display text-xl text-white">Golden Hour</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-0 left-0 w-3/5 h-72 rounded-3xl overflow-hidden border border-azure-300/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ink-800 via-azure-900/60 to-ink-950" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(40,188,230,0.35),transparent_50%)]" />
              <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-gold-300/30" />
              <span className="absolute bottom-4 left-5 font-display text-xl text-white">Moonlit Terrace</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
