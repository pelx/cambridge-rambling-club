import Navbar from '../../components/Navbar';
import WalkCard from '../../components/WalkCard';
import CTASection from '../../components/CTASection';
import { walks, type Walk } from '../../lib/walks';

export default function WalksPage() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const getTime = (date: string) => new Date(date).getTime();

    const upcoming: Walk[] = walks
        .filter(w => getTime(w.date) >= today.getTime())
        .sort((a, b) => getTime(a.date) - getTime(b.date));

    const past: Walk[] = walks
        .filter(w => getTime(w.date) < today.getTime())
        .sort((a, b) => getTime(b.date) - getTime(a.date));

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

                <h1 className="text-3xl font-bold mb-2">Walks</h1>
                <p className="text-stone-500 mb-8">Upcoming and past walks organised by the club.</p>

                <h2 className="text-xl font-semibold mb-4">Upcoming Walks</h2>
                {upcoming.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        {upcoming.map(walk => (
                            <WalkCard key={walk.id} walk={walk} />
                        ))}
                    </div>
                ) : (
                    <p className="text-stone-400 mb-10">No upcoming walks scheduled.</p>
                )}

                <h2 className="text-xl font-semibold mb-4">Past Walks</h2>
                {past.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {past.map(walk => (
                            <WalkCard key={walk.id} walk={walk} />
                        ))}
                    </div>
                ) : (
                    <p className="text-stone-400">No past walks available.</p>
                )}

            </div>

            <CTASection />
        </>
    );
}