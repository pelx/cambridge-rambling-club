'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getWalkById } from '../../../lib/walks';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

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

function getCalendarOptions(): ('Apple' | 'Google' | 'iCal' | 'Microsoft365' | 'Outlook.com')[] {
    if (typeof window === 'undefined') return [ 'Google', 'iCal' ];
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return [ 'Apple', 'Google' ];
    if (/Macintosh/.test(ua)) return [ 'Apple', 'Google', 'iCal' ];
    if (/Android/.test(ua)) return [ 'Google' ];
    if (/Windows/.test(ua)) return [ 'Google', 'Microsoft365', 'Outlook.com' ];
    return [ 'Google', 'Apple', 'iCal', 'Microsoft365', 'Outlook.com' ];
}

export default function WalkDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const walk = getWalkById(Number(id));
    if (!walk) notFound();

    const level = levelConfig[ walk.level ];

    return (
        <main className="max-w-2xl mx-auto px-6 py-10">
            <button
                onClick={() => router.back()}
                className="text-sm text-stone-400 hover:text-stone-600 transition-colors mb-6 inline-block"
            >
                ← Back
            </button>

            <div className="relative w-full h-40 overflow-hidden">
                {walk.image ? (
                    <Image src={walk.image} alt={walk.title} fill className="object-cover" />
                ) : (
                    <img src="/images/walk_placeholder.svg" alt="" className="w-full h-full object-cover" />
                )}
            </div>

            <div className="flex items-start justify-between gap-4 mb-6">
                <h1 className="font-serif text-3xl font-semibold text-stone-900 leading-snug">
                    {walk.title}
                </h1>
                <span className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full mt-1 ${ level.className }`}>
                    {level.label}
                </span>
            </div>

            <div className="mb-6">
                <AddToCalendarButton
                    name={walk.title}
                    startDate={walk.date}
                    startTime={walk.startTime}
                    endTime="16:00"
                    timeZone="Europe/London"
                    location={walk.walkStart || ''}
                    description={walk.description}
                    options={getCalendarOptions()}
                    buttonStyle="round"
                    lightMode="light"
                />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
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

            {[
                { title: 'About this walk', content: walk.description },
                { title: 'Walk start', content: walk.walkStart },
                { title: 'Parking', content: walk.parking },
                { title: 'Driving instructions', content: walk.drivingInstructions },
            ].filter(s => s.content).map(({ title, content }) => (
                <div key={title} className="mb-5">
                    <h2 className="text-xs uppercase tracking-wide text-stone-400 mb-1.5">{title}</h2>
                    <p className="text-sm text-stone-700 leading-relaxed">{content}</p>
                </div>
            ))}

            <hr className="border-stone-200 my-6" />

            <h2 className="text-xs uppercase tracking-wide text-stone-400 mb-3">Walk leader</h2>
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

            <hr className="border-stone-200 my-6" />

            <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 leading-relaxed">
                <p>Please text the leader if you want to join the walk. Please add your name to the text.</p>
                <p className="mt-1">Car sharing is always encouraged.</p>
            </div>
        </main>
    );
}