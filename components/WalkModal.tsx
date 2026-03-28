'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Walk } from '../lib/walks';

const levelConfig = {
    A: { label: 'Level A — challenging', className: 'bg-red-50 text-red-800' },
    B: { label: 'Level B — moderate', className: 'bg-amber-50 text-amber-900' },
    C: { label: 'Level C — easy', className: 'bg-green-50 text-green-900' },
};

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
}

function initialsOf(name: string) {
    return name.split(' ').map(n => n[ 0 ]).join('').toUpperCase().slice(0, 2);
}

export default function WalkModal({ walk, onClose }: { walk: Walk; onClose: () => void }) {
    const level = levelConfig[ walk.level ];

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [ onClose ]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden rounded-t-2xl">
                    {walk.image ? (
                        <Image src={walk.image} alt={walk.title} fill className="object-cover" />
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src="/images/walk-placeholder.svg" alt="" className="w-full h-full object-cover" />
                    )}
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                        <h2 className="font-serif text-2xl font-semibold text-stone-900 leading-snug">
                            {walk.title}
                        </h2>
                        <span className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full ${ level.className }`}>
                            {level.label}
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                            { label: 'Date', value: formatDate(walk.date) },
                            { label: 'Start time', value: walk.startTime },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-stone-50 rounded-lg px-4 py-3">
                                <p className="text-xs uppercase tracking-wide text-stone-400 mb-0.5">{label}</p>
                                <p className="text-sm font-medium text-stone-900">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Sections */}
                    {[
                        { title: 'About this walk', content: walk.description },
                        { title: 'Walk start', content: walk.walkStart },
                        { title: 'Parking', content: walk.parking },
                        { title: 'Driving instructions', content: walk.drivingInstructions },
                    ].filter(s => s.content).map(({ title, content }) => (
                        <div key={title} className="mb-4">
                            <h3 className="text-xs uppercase tracking-wide text-stone-400 mb-1.5">{title}</h3>
                            <p className="text-sm text-stone-700 leading-relaxed">{content}</p>
                        </div>
                    ))}

                    <hr className="border-stone-200 my-5" />

                    {/* Leader */}
                    <h3 className="text-xs uppercase tracking-wide text-stone-400 mb-3">Walk leader</h3>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-sm font-medium text-green-900 flex-shrink-0">
                            {initialsOf(walk.leader)}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-900">{walk.leader}</p>
                            {walk.phone && walk.phone.trim() !== '' && (
                                <p className="text-sm text-stone-500">{walk.phone} — book by text, add your name</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}