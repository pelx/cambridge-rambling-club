'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import WalkCard from '../../components/WalkCard';
import WalkFilter from '../../components/WalkFilter';
import { walks } from '../../lib/walks';

export default function WalksPage() {
    const [ filter, setFilter ] = useState<'upcoming' | 'past'>('upcoming');

    const today = new Date();

    const filteredWalks = walks.filter((walk) => {
        const walkDate = new Date(walk.date);

        return filter === 'upcoming'
            ? walkDate >= today
            : walkDate < today;
    });

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-6">Walks</h1>

                <WalkFilter value={filter} onChange={setFilter} />

                <div className="grid md:grid-cols-3 gap-6">
                    {filteredWalks.map((walk) => (
                        <WalkCard key={walk.id} walk={walk} />
                    ))}
                </div>

            </div>
        </>
    );
}