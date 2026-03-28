import Link from 'next/link';
import Image from 'next/image';
import { Walk } from '../lib/walks';

const levelConfig = {
    A: { label: 'Level A', className: 'bg-red-50 text-red-800' },
    B: { label: 'Level B', className: 'bg-amber-50 text-amber-900' },
    C: { label: 'Level C', className: 'bg-green-50 text-green-900' },
};

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
}

export default function WalkCard({ walk }: { walk: Walk }) {
    const level = levelConfig[ walk.level ];

    return (
        <Link href={`/walks/${ walk.id }`}>
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-300 transition-colors cursor-pointer">

                {/* Image */}
                <div className="relative w-full h-40 overflow-hidden">
                    {walk.image ? (
                        <Image src={walk.image} alt={walk.title} fill className="object-cover" />
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src="images/walk_placeholder.svg" alt="" className="w-full h-full object-cover" />
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-2 ${ level.className }`}>
                        {level.label}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-stone-900 mb-2 leading-snug">
                        {walk.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-sm text-stone-800">
                        <span>{formatDate(walk.date)} · {walk.startTime}</span>
                        <span>Led by {walk.leader}</span>
                    </div>
                    <p className="text-sm text-stone-800 mt-2.5 leading-relaxed line-clamp-2">
                        {walk.description}
                    </p>
                </div>

            </div>
        </Link>
    );
}