import Navbar from '../../components/Navbar';
import CTASection from '../../components/CTASection';
import NewsletterCard from '../../components/NewsletterCard';
import { newsletters } from '../../lib/newsletters';

export default function NewslettersPage() {

    // Sort newest first
    const sorted = [ ...newsletters ].sort((a, b) => {
        return b.year - a.year;
    });

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

                <h1 className="text-3xl font-bold mb-6">
                    Newsletters
                </h1>

                <p className="text-foreground/70 mb-8">
                    Browse our seasonal newsletters.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sorted.map((n) => (
                        <NewsletterCard key={n.id} newsletter={n} />
                    ))}
                </div>

            </div>

            <CTASection />
        </>
    );
}