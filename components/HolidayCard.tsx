import Link from 'next/link';
import Image from 'next/image';
import { Holiday } from '../lib/holidays';

function parseDate(d: string) {
    const [ dd, mm, yyyy ] = d.split('/');
    return new Date(`${ yyyy }-${ mm }-${ dd }`);
}

function formatDate(d: string) {
    return parseDate(d).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric',
    });
}

export default function HolidayCard({ holiday }: { holiday: Holiday }) {
    return (
        <Link href={`/holidays/${ holiday.id }`}>
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-300 transition-colors cursor-pointer">


                {/* Content */}
                <div className="p-4">
                    <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-2 bg-green-50 text-green-800">
                        {formatDate(holiday.startDate)} — {formatDate(holiday.endDate)}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-stone-900 mb-2 leading-snug">
                        {holiday.title}
                    </h3>
                    <p className="text-sm text-stone-500 mb-2">Led by {holiday.leader}</p>
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
                        {holiday.content}
                    </p>
                </div>

            </div>
        </Link>
    );
}