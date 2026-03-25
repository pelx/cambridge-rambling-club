import Link from 'next/link';
import { Walk } from '@/lib/walks';

export default function WalkCard({ walk }: { walk: Walk }) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
                src={walk.image}
                className="h-40 w-full object-cover"
            />

            <div className="p-4">
                <p className="text-sm text-gray-500">
                    {new Date(walk.date).toDateString()}
                </p>

                <h3 className="font-semibold text-lg">
                    {walk.title}
                </h3>

                <p className="text-sm">
                    {walk.distance} km • {walk.difficulty}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                    {walk.description}
                </p>

                <Link
                    href={`/walks/${ walk.id }`}
                    className="inline-block mt-3 text-green-700"
                >
                    Details →
                </Link>
            </div>
        </div>
    );
}
