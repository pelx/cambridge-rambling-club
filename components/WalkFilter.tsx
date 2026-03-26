'use client';

type Props = {
    value: 'upcoming' | 'past';
    onChange: (value: 'upcoming' | 'past') => void;
};

export default function WalkFilter({ value, onChange }: Props) {
    return (
        <div className="mb-6">
            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value as 'upcoming' | 'past')
                }
                className="border px-4 py-2 rounded-lg"
            >
                <option value="upcoming">Upcoming Walks</option>
                <option value="past">Past Walks</option>
            </select>
        </div>
    );
}
