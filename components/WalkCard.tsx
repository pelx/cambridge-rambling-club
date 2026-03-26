import Link from 'next/link';
import Image from 'next/image';

type Walk = {
    id: number;
    title: string;
    date: string;
    time: string;
    level: 'A' | 'B' | 'C';
    leader: string;
    description: string;
    image: string;
};

type Props = {
    walk: Walk;
};

// ✅ Date formatter (DD-MMM-YYYY)
function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function WalkCard({ walk }: Props) {
    return (
        <Link href={`/walks/${ walk.id }`}>
            <div className="border rounded-xl shadow-sm bg-white hover:shadow-md transition cursor-pointer overflow-hidden">

                {/* Image */}
                <div className="relative w-full h-40">
                    <Image
                        src={walk.image}
                        alt={walk.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-5">

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2">
                        {walk.title}
                    </h3>

                    {/* Date + Time */}
                    <p className="text-sm text-gray-500 mb-2">
                        🗓 {formatDate(walk.date)} • {walk.time}
                    </p>

                    {/* Level badge */}
                    <div className="mb-2">
                        <span
                            className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${ walk.level === 'A'
                                ? 'bg-red-100 text-red-700'
                                : walk.level === 'B'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-green-100 text-green-700'
                                }`}
                        >
                            Level {walk.level}
                        </span>
                    </div>

                    {/* Leader */}
                    <p className="text-sm text-gray-600 mb-3">
                        👤 {walk.leader}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-700 line-clamp-3">
                        {walk.description}
                    </p>

                </div>
            </div>
        </Link>
    );
}
