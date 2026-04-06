import Image from 'next/image';
import { Newsletter } from '../lib/newsletters';

type Props = {
    newsletter: Newsletter;
};

export default function NewsletterCard({ newsletter }: Props) {
    return (
        <a href={newsletter.file}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-stone-200 rounded-xl bg-white shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
        >

            {/* Image */}
            <div className="relative w-full h-16 overflow-hidden">
                {newsletter.image ? (
                    <Image
                        src={newsletter.image}
                        alt={newsletter.season + ' ' + newsletter.year}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <img src="/images/walk_placeholder.svg" alt="" className="w-full h-full object-cover" />
                )}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">
                    {newsletter.season} {newsletter.year}
                </h3>
                <p className="text-stone-500 text-sm">
                    Club Newsletter
                </p>
                <p className="mt-3 text-green-600 text-sm font-medium">
                    View PDF →
                </p>
            </div>
        </a>
    );
}
