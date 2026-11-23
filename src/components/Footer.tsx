import { Waves, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-sand-100/10 px-6 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="grid place-items-center w-9 h-9 rounded-full border border-gold-400/40 text-gold-300">
                <Waves size={18} />
              </span>
              <span className="font-display text-2xl text-white">
                Mahin <span className="gold-gradient-text">Haven</span>
              </span>
            </div>
            <p className="text-sand-100/60 leading-relaxed max-w-sm">
              A private oceanfront sanctuary where modern architecture meets the timeless rhythm of the sea.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-sand-100/15 grid place-items-center text-sand-100/70 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-ultra uppercase text-gold-300 mb-5">Contact</h4>
            <ul className="space-y-3.5 text-sm text-sand-100/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-gold-300 mt-0.5 shrink-0" />
                <span>12 Mahin Coast Road, Serenity Bay</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold-300 shrink-0" />
                <span>+1 (555) 240-8800</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-gold-300 shrink-0" />
                <span>concierge@azurehaven.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-ultra uppercase text-gold-300 mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-sand-100/70">
              <li><a href="#rooms" className="hover:text-gold-200 transition-colors">Suites</a></li>
              <li><a href="#experiences" className="hover:text-gold-200 transition-colors">Experiences</a></li>
              <li><a href="#booking" className="hover:text-gold-200 transition-colors">Reservations</a></li>
              <li><a href="#" className="hover:text-gold-200 transition-colors">Wellness</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-sand-100/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-sand-100/40">
            © {new Date().getFullYear()} Mahin Haven Resort. All rights reserved.
          </p>
          <p className="text-xs text-sand-100/40 tracking-wide">Crafted for those who chase the horizon.</p>
        </div>
      </div>
    </footer>
  );
}
