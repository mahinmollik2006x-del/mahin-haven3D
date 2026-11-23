import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, BedDouble, Maximize, Users } from 'lucide-react';

type Room = {
  name: string;
  tagline: string;
  price: number;
  size: string;
  sleeps: number;
  bed: string;
  accent: string;
  gradient: string;
};

const rooms: Room[] = [
  {
    name: 'Tide Whisper Suite',
    tagline: 'Floor-to-ceiling glass opening to a private terrace above the surf.',
    price: 680,
    size: '68 m²',
    sleeps: 2,
    bed: 'King',
    accent: 'azure',
    gradient: 'from-azure-600/30 via-azure-800/20 to-ink-900',
  },
  {
    name: 'Celestial Sky Villa',
    tagline: 'A rooftop infinity plunge pool beneath an unfiltered night sky.',
    price: 1240,
    size: '120 m²',
    sleeps: 4,
    bed: 'King + Twin',
    accent: 'gold',
    gradient: 'from-gold-500/25 via-gold-700/15 to-ink-900',
  },
  {
    name: 'Haven Ocean Pavilion',
    tagline: 'An architect-designed sanctuary with direct lagoon access.',
    price: 2100,
    size: '210 m²',
    sleeps: 4,
    bed: '2 King',
    accent: 'gold',
    gradient: 'from-azure-500/25 via-gold-600/15 to-ink-900',
  },
];

function TiltCard({ room, index }: { room: Room; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sy = useSpring(ry, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sx, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(sy, [-0.5, 0.5], ['-12deg', '12deg']);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rx.set((e.clientY - r.top) / r.height - 0.5);
    ry.set((e.clientX - r.left) / r.width - 0.5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative rounded-3xl overflow-hidden border border-sand-100/10 bg-gradient-to-br ${room.gradient} p-7 min-h-[440px] flex flex-col justify-between hover:border-gold-400/40 transition-colors duration-500`}
      >
        {/* Sheen */}
        <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(212,168,87,0.18),transparent_45%)]" />

        {/* Visual block — stylized architectural scene */}
        <div className="relative h-44 rounded-2xl overflow-hidden mb-6" style={{ transform: 'translateZ(40px)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-azure-300/20 via-azure-700/30 to-ink-950" />
          <div className="absolute inset-x-0 bottom-0 h-2/3">
            {/* sun */}
            <div className="absolute right-8 top-4 w-12 h-12 rounded-full bg-gold-200/80 blur-[1px]" />
            {/* horizon line */}
            <div className="absolute top-1/2 inset-x-0 h-px bg-gold-300/40" />
            {/* water reflections */}
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-b from-azure-400/30 to-transparent">
              <div className="absolute inset-x-6 top-2 h-px bg-white/20" />
              <div className="absolute inset-x-10 top-6 h-px bg-white/10" />
              <div className="absolute inset-x-4 top-10 h-px bg-white/15" />
            </div>
            {/* pavilion silhouette */}
            <div className="absolute left-6 bottom-8 w-24 h-16">
              <div className="absolute bottom-0 inset-x-0 h-10 bg-ink-700/80 rounded-sm" />
              <div className="absolute -top-1 left-2 right-2 h-3 bg-ink-600/70 rounded-t" />
              <div className="absolute bottom-10 left-0 w-px h-6 bg-gold-300/50" />
              <div className="absolute bottom-10 right-0 w-px h-6 bg-gold-300/50" />
            </div>
          </div>
          <div className="absolute top-3 left-3 text-[10px] tracking-ultra uppercase text-sand-50/70 bg-ink-950/40 px-2.5 py-1 rounded-full">
            Suite
          </div>
        </div>

        <div style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl text-white leading-tight">{room.name}</h3>
            <ArrowUpRight size={20} className="text-gold-300 shrink-0 mt-1" />
          </div>
          <p className="mt-3 text-sm text-sand-100/70 leading-relaxed">{room.tagline}</p>

          <div className="mt-5 flex items-center gap-5 text-xs text-sand-100/60">
            <span className="flex items-center gap-1.5">
              <Maximize size={14} className="text-gold-300" /> {room.size}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-gold-300" /> Sleeps {room.sleeps}
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} className="text-gold-300" /> {room.bed}
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-sand-100/10 flex items-end justify-between">
            <div>
              <span className="font-display text-3xl gold-gradient-text">${room.price}</span>
              <span className="text-xs text-sand-100/60 ml-1">/ night</span>
            </div>
            <a
              href="#booking"
              className="text-xs tracking-widest uppercase px-4 py-2.5 rounded-full border border-gold-400/40 text-gold-200 hover:bg-gold-400 hover:text-ink-950 transition-all duration-300"
            >
              Reserve
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Rooms() {
  return (
    <section id="rooms" className="relative py-32 md:py-44 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-xs tracking-ultra uppercase text-gold-300">Accommodations</span>
            <h2 className="mt-5 font-display text-5xl md:text-6xl text-white leading-tight">
              Suites designed for the <span className="gold-gradient-text italic">elements</span>
            </h2>
          </div>
          <p className="max-w-md text-sand-100/70 leading-relaxed">
            Each residence is a private composition of stone, glass, and ocean air — no two views alike, every comfort considered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {rooms.map((r, i) => (
            <TiltCard key={r.name} room={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
