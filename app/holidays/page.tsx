import Navbar from '../../components/Navbar';
import HolidayCard from '../../components/HolidayCard';
import { holidays } from '../../lib/holidays';

function parseDate(d: string) {
    const [ dd, mm, yyyy ] = d.split('/');
    return new Date(`${ yyyy }-${ mm }-${ dd }`).getTime();
}

export default function HolidaysPage() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = [ ...holidays ]
        .filter(h => parseDate(h.endDate) >= today.getTime())
        .sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));

    const past = [ ...holidays ]
        .filter(h => parseDate(h.endDate) < today.getTime())
        .sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate));

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

                <h1 className="text-3xl font-bold mb-2">Holidays</h1>
                <p className="text-stone-500 mb-8">Away trips and weekends organised by the club.</p>

                <h2 className="text-xl font-semibold mb-4">Upcoming Trips</h2>
                {upcoming.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        {upcoming.map(h => (
                            <HolidayCard key={h.id} holiday={h} />
                        ))}
                    </div>
                ) : (
                    <p className="text-stone-400 mb-10">No upcoming trips scheduled.</p>
                )}

                <h2 className="text-xl font-semibold mb-4">Past Trips</h2>
                {past.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {past.map(h => (
                            <HolidayCard key={h.id} holiday={h} />
                        ))}
                    </div>
                ) : (
                    <p className="text-stone-400">No past trips available.</p>
                )}

            </div>
        </>
    );
}