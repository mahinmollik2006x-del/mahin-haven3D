import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Sun, Moon } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: 'Bespoke Service',
    body: 'A dedicated host attends to every detail of your stay, from arrival rituals to twilight turn-down.',
  },
  {
    icon: Sun,
    title: 'Golden-Hour Pools',
    body: 'Infinity edges dissolve into the horizon, framed by warm stone and the hush of the open sea.',
  },
  {
    icon: Moon,
    title: 'Nights by the Tide',
    body: 'Private cabanas, lantern-lit terraces, and a celestial lounge beneath an unblemished sky.',
  },
];

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -left-40 top-20 w-[500px] h-[500px] rounded-full bg-azure-500/10 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}
        className="absolute -right-40 bottom-0 w-[480px] h-[480px] rounded-full bg-gold-400/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-ultra uppercase text-gold-300">The Mahin Haven Ethos</span>
          <h2 className="mt-6 font-display text-5xl md:text-6xl text-white leading-tight text-balance">
            Luxury, distilled to a single feeling — <span className="gold-gradient-text italic">serenity</span>.
          </h2>
          <p className="mt-6 text-sand-100/70 text-lg leading-relaxed">
            We believe true indulgence is quiet. It is the warmth of stone beneath bare feet, the slow pour of morning light, and the gentle rhythm of waves measured only by your own breath.
          </p>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-8 group hover:border-gold-400/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gold-400/10 text-gold-300 mb-6 group-hover:scale-110 transition-transform">
                <p.icon size={22} />
              </div>
              <h3 className="font-display text-2xl text-white mb-3">{p.title}</h3>
              <p className="text-sand-100/70 leading-relaxed text-sm">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
