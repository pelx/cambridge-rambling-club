'use client';

import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { walks } from '../../lib/walks';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import type { Walk } from '../../lib/walks';

const levelConfig = {
    A: { label: 'Level A', className: 'bg-red-50 text-red-800', color: '#A32D2D' },
    B: { label: 'Level B', className: 'bg-amber-50 text-amber-900', color: '#BA7517' },
    C: { label: 'Level C', className: 'bg-green-50 text-green-900', color: '#3B6D11' },
};

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
}

export default function CalendarPage() {
    const router = useRouter();
    const [ selectedDate, setSelectedDate ] = useState<string | null>(null);

    const events = walks.map(walk => ({
        id: String(walk.id),
        title: walk.title,
        date: walk.date,
        backgroundColor: levelConfig[ walk.level ].color,
        borderColor: levelConfig[ walk.level ].color,
        textColor: '#ffffff',
    }));

    const selectedWalks: Walk[] = selectedDate
        ? walks.filter(w => w.date === selectedDate)
        : [];

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

                <h1 className="text-3xl font-bold mb-2">Walks calendar</h1>
                <p className="text-stone-500 mb-8">Click a date to see walks. Click a walk to view details.</p>

                {/* Legend */}
                <div className="flex gap-4 mb-6">
                    {Object.entries(levelConfig).map(([ level, cfg ]) => (
                        <div key={level} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ background: cfg.color }} />
                            <span className="text-sm text-stone-600">Level {level}</span>
                        </div>
                    ))}
                </div>

                {/* Calendar */}
                <div className="bg-white border border-stone-200 rounded-xl overflow-hidden p-4 mb-6">
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        events={events}
                        dateClick={(info) => {
                            setSelectedDate(
                                selectedDate === info.dateStr ? null : info.dateStr
                            );
                        }}
                        eventClick={(info) => {
                            setSelectedDate(info.event.startStr);
                        }}
                        eventContent={(arg) => (
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: arg.event.backgroundColor,
                                margin: '0 auto',
                            }} />
                        )}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: '',
                        }}
                        height="auto"
                        firstDay={1}
                    />
                </div>

                {/* Selected day walks */}
                {selectedDate && (
                    <div className="bg-white border border-stone-200 rounded-xl p-6">
                        <h2 className="text-sm uppercase tracking-wide text-stone-400 mb-4">
                            {formatDate(selectedDate)}
                        </h2>

                        {selectedWalks.length === 0 ? (
                            <p className="text-stone-400 text-sm">No walks on this day.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {selectedWalks.map(walk => (
                                    <div
                                        key={walk.id}
                                        onClick={() => router.push(`/walks/${ walk.id }`)}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
                                    >
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${ levelConfig[ walk.level ].className }`}>
                                            {levelConfig[ walk.level ].label}
                                        </span>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-stone-900">{walk.title}</p>
                                            <p className="text-xs text-stone-500">{walk.startTime} · Led by {walk.leader}</p>
                                        </div>
                                        <span className="text-stone-400 text-sm">→</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </>
    );
}