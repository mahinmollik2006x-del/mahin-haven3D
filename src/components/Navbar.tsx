import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Waves } from 'lucide-react';

const links = ['Rooms', 'Experiences', 'Dining', 'Booking'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-full border border-gold-400/40 text-gold-300 group-hover:bg-gold-400/10 transition-colors">
            <Waves size={18} />
          </span>
          <span className="font-display text-2xl tracking-wide text-white">
            Mahin <span className="gold-gradient-text">Haven</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-sm tracking-widest uppercase text-sand-100/80 hover:text-gold-300 transition-colors"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#booking"
          className="hidden sm:inline-block text-sm tracking-widest uppercase px-5 py-2.5 rounded-full border border-gold-400/50 text-gold-200 hover:bg-gold-400 hover:text-ink-950 transition-all duration-300"
        >
          Reserve
        </a>
      </div>
    </motion.nav>
  );
}
