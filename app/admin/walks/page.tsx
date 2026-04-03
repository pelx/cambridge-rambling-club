'use client';

import { useState } from 'react';
import { walks } from '../../../lib/walks';
import type { Walk } from '../../../lib/walks';
import WalkForm from './WalkForm';
import { deleteWalk } from './actions';
import Navbar from '../../../components/Navbar';

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric',
    });
}

export default function AdminWalksPage() {
    const [ editing, setEditing ] = useState<Walk | null | 'new'>(null);

    if (editing !== null) {
        return (
            <>
                <Navbar />
                <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
                    <WalkForm
                        walk={editing === 'new' ? undefined : editing}
                        onDone={() => setEditing(null)}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-stone-900">Manage walks</h1>
                        <p className="text-stone-500 mt-1">{walks.length} walks in total</p>
                    </div>
                    <button
                        onClick={() => setEditing('new')}
                        className="bg-green-800 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-green-900 transition-colors"
                    >
                        + Add walk
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {[ ...walks ]
                        .sort((a, b) => {
                            const dateA = new Date(a.date).getTime();
                            const dateB = new Date(b.date).getTime();
                            if (dateA !== dateB) return dateA - dateB;
                            return a.level.localeCompare(b.level);
                        })
                        .map(walk => (
                            <div
                                key={walk.id}
                                className="bg-white border border-stone-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-stone-900 truncate">{walk.title}</p>
                                    <p className="text-xs text-stone-400 mt-0.5">
                                        {formatDate(walk.date)} · {walk.startTime} · Level {walk.level} · {walk.leader}
                                    </p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => setEditing(walk)}
                                        className="text-sm text-green-700 font-medium hover:text-green-900 transition-colors px-3 py-1.5"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (confirm(`Delete "${ walk.title }"?`)) {
                                                await deleteWalk(walk.id);
                                                window.location.reload();
                                            }
                                        }}
                                        className="text-sm text-red-600 font-medium hover:text-red-800 transition-colors px-3 py-1.5"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </>
    );
}