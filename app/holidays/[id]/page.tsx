import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { holidays, getHolidayById } from '../../../lib/holidays';
import { notFound } from 'next/navigation';

function parseDate(d: string) {
    const [ dd, mm, yyyy ] = d.split('/');
    return new Date(`${ yyyy }-${ mm }-${ dd }`);
}

function formatDate(d: string) {
    return parseDate(d).toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
}

export function generateStaticParams() {
    return holidays.map(h => ({ id: String(h.id) }));
}

export default async function HolidayDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const holiday = getHolidayById(Number(id));
    if (!holiday) notFound();

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

                <Link href="/holidays" className="text-sm text-stone-400 hover:text-stone-600 transition-colors mb-6 inline-block">
                    ← Back to Holidays
                </Link>

                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium bg-green-50 text-green-800 px-2.5 py-1 rounded-full">
                        {formatDate(holiday.startDate)} — {formatDate(holiday.endDate)}
                    </span>
                </div>

                <h1 className="text-3xl font-bold text-stone-900 mb-2 leading-snug">
                    {holiday.title}
                </h1>

                <p className="text-sm text-stone-400 mb-6">Led by {holiday.leader}</p>

                <div className="bg-white border border-stone-200 rounded-xl p-6">
                    {holiday.content.split('\n\n').map((para, i) => (
                        <p key={i} className="text-stone-700 leading-relaxed mb-4 last:mb-0">
                            {para.split(/([\w.-]+@[\w.-]+\.\w+)/).map((part, j) =>
                                /[\w.-]+@[\w.-]+\.\w+/.test(part) ? (
                                    <a key={j} href={`mailto:${ part }`} className="text-green-700 underline hover:text-green-900">
                                        {part}
                                    </a>
                                ) : (
                                    part
                                )
                            )}
                        </p>
                    ))}
                </div>

            </div>
        </>
    );
}