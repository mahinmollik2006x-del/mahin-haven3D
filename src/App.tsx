import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Rooms from '@/components/Rooms';
import Experiences from '@/components/Experiences';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-sand-50 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Rooms />
        <Experiences />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
