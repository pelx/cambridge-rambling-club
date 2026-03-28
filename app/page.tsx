import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import WalkCard from '../components/WalkCard';
import CTASection from '../components/CTASection';
import { walks, type Walk } from '../lib/walks';

export default function WalksPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to avoid timezone issues

  const getTime = (date: string) => new Date(date).getTime();

  // Upcoming walks (sorted ascending)
  const upcoming: Walk[] = walks
    .filter((w) => getTime(w.date) >= today.getTime())
    .sort((a, b) => getTime(a.date) - getTime(b.date));

  // Past walks (sorted descending)
  const past: Walk[] = walks
    .filter((w) => getTime(w.date) < today.getTime())
    .sort((a, b) => getTime(b.date) - getTime(a.date));

  return (
    <>
      <Navbar />
      {/* Header */}
      <PageHeader
        title="Walks"
        subtitle="Explore the countryside with us"
        image="/images/hero.jpg"
      />


      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-4">
          Walks
        </h1>

        <p className="text-foreground/70 mb-8">
          Explore upcoming and past walks organised by the club.
        </p>

        {/* Upcoming Walks */}
        <h2 className="text-xl font-semibold mb-4">
          Upcoming Walks
        </h2>

        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {upcoming.map((walk) => (
              <WalkCard key={walk.id} walk={walk} />
            ))}
          </div>
        ) : (
          <p className="text-foreground/60 mb-10">
            No upcoming walks scheduled.
          </p>
        )}

        {/* Past Walks */}
        <h2 className="text-xl font-semibold mb-4">
          Past Walks
        </h2>

        {past.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {past.map((walk) => (
              <WalkCard key={walk.id} walk={walk} />
            ))}
          </div>
        ) : (
          <p className="text-foreground/60">
            No past walks available.
          </p>
        )}

      </div>

      <CTASection />
    </>
  );
}