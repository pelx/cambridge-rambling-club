'use client';

import { useState } from 'react';
import { Walk } from '../../../lib/walks';
import { saveWalk } from './actions';

const empty: Omit<Walk, 'id'> = {
    title: '',
    date: '',
    startTime: '',
    level: 'B',
    leader: '',
    phone: '',
    description: '',
    drivingInstructions: '',
    parking: '',
    walkStart: '',
    image: '',
};

export default function WalkForm({ walk, onDone }: { walk?: Walk; onDone: () => void }) {
    const [ form, setForm ] = useState<Omit<Walk, 'id'>>(walk ? { ...walk } : empty);
    const [ saving, setSaving ] = useState(false);

    const set = (field: keyof Omit<Walk, 'id'>, value: string) =>
        setForm(f => ({ ...f, [ field ]: value }));

    async function handleSubmit() {
        setSaving(true);
        await saveWalk({ ...form, id: walk?.id ?? 0 });
        setSaving(false);
        onDone();
    }

    const field = (label: string, key: keyof Omit<Walk, 'id'>, type = 'text') => (
        <div className="mb-4">
            <label className="block text-xs uppercase tracking-wide text-stone-400 mb-1">{label}</label>
            <input
                type={type}
                value={form[ key ] as string}
                onChange={e => set(key, e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-green-600"
            />
        </div>
    );

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-6">
                {walk ? 'Edit walk' : 'Add walk'}
            </h2>

            {field('Title', 'title')}

            <div className="grid grid-cols-2 gap-4">
                {field('Date', 'date', 'date')}
                {field('Start time', 'startTime', 'time')}
            </div>

            <div className="mb-4">
                <label className="block text-xs uppercase tracking-wide text-stone-400 mb-1">Level</label>
                <select
                    value={form.level}
                    onChange={e => set('level', e.target.value)}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-green-600"
                >
                    <option value="A">A — challenging</option>
                    <option value="B">B — moderate</option>
                    <option value="C">C — easy</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {field('Leader', 'leader')}
                {field('Phone', 'phone')}
            </div>

            <div className="mb-4">
                <label className="block text-xs uppercase tracking-wide text-stone-400 mb-1">Description</label>
                <textarea
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    rows={3}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-green-600"
                />
            </div>

            {field('Walk start', 'walkStart')}
            {field('Parking', 'parking')}

            <div className="mb-4">
                <label className="block text-xs uppercase tracking-wide text-stone-400 mb-1">Driving instructions</label>
                <textarea
                    value={form.drivingInstructions}
                    onChange={e => set('drivingInstructions', e.target.value)}
                    rows={3}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-green-600"
                />
            </div>

            {field('Image path', 'image')}

            <div className="flex gap-3 mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-green-800 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-green-900 transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save walk'}
                </button>
                <button
                    onClick={onDone}
                    className="text-sm text-stone-400 hover:text-stone-600 px-5 py-2.5 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}