'use client';

import { useState } from 'react';

export default function FilterBar() {
    const [ distance, setDistance ] = useState('');
    const [ difficulty, setDifficulty ] = useState('');

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">

            {/* Label */}
            <span className="font-medium text-gray-700">
                Filter by:
            </span>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">

                {/* Distance */}
                <select
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                >
                    <option value="">Distance</option>
                    <option value="short">Short (&lt; 8km)</option>
                    <option value="medium">Medium (8–15km)</option>
                    <option value="long">Long (15km+)</option>
                </select>

                {/* Difficulty */}
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                >
                    <option value="">Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Hard">Hard</option>
                </select>

                {/* Button (UI only for now) */}
                <button
                    className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
                >
                    Apply Filters
                </button>

            </div>
        </div>
    );
}
