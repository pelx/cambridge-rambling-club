import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FilterBar from '../../components/FilterBar';
import WalkCard from '../../components/WalkCard';
import CTASection from '../../components/CTASection';
import { walks } from '../../lib/walks';

export default function WalksPage() {
    return (
        <>
            <Navbar />

            {/* Header */}
            <PageHeader
                title="Walks"
                subtitle="Explore the countryside with us"
                image="/images/hero.jpg"
            />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <FilterBar />

                <h2 className="text-2xl md:text-3xl font-semibold my-8">
                    Upcoming Walks
                </h2>

                {/* Walk grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {walks.map((walk) => (
                        <WalkCard key={walk.id} walk={walk} />
                    ))}
                </div>

            </div>

            <CTASection />
        </>
    );
}