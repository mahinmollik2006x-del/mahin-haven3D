import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Users, Mail, User, Check, Loader2, Send } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const roomOptions = [
  'Tide Whisper Suite',
  'Celestial Sky Villa',
  'Haven Ocean Pavilion',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    room_type: roomOptions[0],
    check_in: '',
    check_out: '',
    guests: 2,
    special_requests: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const update = (key: keyof typeof form, value: string | number) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.check_in || !form.check_out) {
      setStatus('error');
      setError('Please complete all required fields.');
      return;
    }
    if (new Date(form.check_out) <= new Date(form.check_in)) {
      setStatus('error');
      setError('Check-out must be after check-in.');
      return;
    }
    setStatus('loading');
    setError('');

    // When Supabase isn't configured (e.g. a static GitHub Pages build with
    // no env vars), skip the database write and treat the request as a demo
    // submission so the page never breaks.
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 700));
      setStatus('success');
      return;
    }

    const { error: insertError } = await supabase.from('bookings').insert({
      name: form.name,
      email: form.email,
      room_type: form.room_type,
      check_in: form.check_in,
      check_out: form.check_out,
      guests: form.guests,
      special_requests: form.special_requests || null,
    });
    if (insertError) {
      setStatus('error');
      setError('We could not submit your request. Please try again shortly.');
      return;
    }
    setStatus('success');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="relative py-32 md:py-44 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/50 to-ink-950 pointer-events-none" />
      <div className="absolute -right-32 top-1/3 w-[420px] h-[420px] rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-ultra uppercase text-gold-300">Reservations</span>
          <h2 className="mt-5 font-display text-5xl md:text-6xl text-white leading-tight">
            Begin your <span className="gold-gradient-text italic">Mahin Haven</span> story
          </h2>
          <p className="mt-5 text-sand-100/70 max-w-lg mx-auto">
            Tell us when you'd like to arrive and our concierge will craft the rest.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-gold-400/15 grid place-items-center mb-6">
                  <Check size={28} className="text-gold-300" />
                </div>
                <h3 className="font-display text-3xl text-white">Request received</h3>
                <p className="mt-4 text-sand-100/70 max-w-md mx-auto">
                  Thank you, {form.name.split(' ')[0]}. Our concierge will reach out to{' '}
                  <span className="text-gold-200">{form.email}</span> within 24 hours to confirm your stay.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({
                      name: '',
                      email: '',
                      room_type: roomOptions[0],
                      check_in: '',
                      check_out: '',
                      guests: 2,
                      special_requests: '',
                    });
                  }}
                  className="mt-8 text-sm tracking-widest uppercase text-gold-200 hover:text-gold-300 transition-colors"
                >
                  Make another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-6"
              >
                <Field label="Full Name" icon={<User size={16} />}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Jane Haven"
                    className="input"
                    required
                  />
                </Field>

                <Field label="Email" icon={<Mail size={16} />}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="jane@example.com"
                    className="input"
                    required
                  />
                </Field>

                <Field label="Preferred Suite">
                  <select
                    value={form.room_type}
                    onChange={(e) => update('room_type', e.target.value)}
                    className="input"
                  >
                    {roomOptions.map((r) => (
                      <option key={r} value={r} className="bg-ink-900">
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Guests" icon={<Users size={16} />}>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={form.guests}
                    onChange={(e) => update('guests', Number(e.target.value))}
                    className="input"
                  />
                </Field>

                <Field label="Check-in" icon={<CalendarDays size={16} />}>
                  <input
                    type="date"
                    min={today}
                    value={form.check_in}
                    onChange={(e) => update('check_in', e.target.value)}
                    className="input"
                    required
                  />
                </Field>

                <Field label="Check-out" icon={<CalendarDays size={16} />}>
                  <input
                    type="date"
                    min={form.check_in || today}
                    value={form.check_out}
                    onChange={(e) => update('check_out', e.target.value)}
                    className="input"
                    required
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Special Requests (optional)">
                    <textarea
                      value={form.special_requests}
                      onChange={(e) => update('special_requests', e.target.value)}
                      rows={3}
                      placeholder="Anniversary celebration, dietary preferences, late arrival…"
                      className="input resize-none"
                    />
                  </Field>
                </div>

                {status === 'error' && (
                  <p className="md:col-span-2 text-sm text-red-300/90 bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-sand-100/50">
                    No payment required now — our concierge confirms availability first.
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-medium tracking-wide transition-transform hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Request Reservation
                        <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(4,20,29,0.5);
          border: 1px solid rgba(212,168,87,0.18);
          border-radius: 0.9rem;
          padding: 0.85rem 1rem;
          color: #f3ede2;
          font-size: 0.9rem;
          transition: border-color 0.25s, background 0.25s;
        }
        .input::placeholder { color: rgba(243,237,226,0.4); }
        .input:focus {
          outline: none;
          border-color: rgba(212,168,87,0.6);
          background: rgba(4,20,29,0.7);
        }
        .input option { color: #f3ede2; }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.8) sepia(1) saturate(3) hue-rotate(5deg);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-sand-100/60 mb-2.5">
        {icon && <span className="text-gold-300">{icon}</span>}
        {label}
      </span>
      {children}
    </label>
  );
}
