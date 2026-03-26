'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import WalkCard from '../../components/WalkCard';
import WalkFilter from '../../components/WalkFilter';
import CTASection from '../../components/CTASection';
import { walks } from '../../lib/walks';

export default function WalksPage() {
    const [ filter, setFilter ] = useState<'upcoming' | 'past'>('upcoming');

    const today = new Date();

    // Filter + sort walks
    const filteredWalks = walks
        .filter((walk) => {
            const walkDate = new Date(walk.date);

            return filter === 'upcoming'
                ? walkDate >= today
                : walkDate < today;
        })
        .sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

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

                {/* Title + Filter */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

                    <h2 className="text-2xl md:text-3xl font-semibold">
                        {filter === 'upcoming' ? 'Upcoming Walks' : 'Past Walks'}
                    </h2>

                    <WalkFilter value={filter} onChange={setFilter} />
                </div>

                {/* Walk list */}
                {filteredWalks.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredWalks.map((walk) => (
                            <WalkCard key={walk.id} walk={walk} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mt-10 text-center">
                        No walks found.
                    </p>
                )}

            </div>

            <CTASection />
        </>
    );
}
