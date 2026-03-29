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
            <div className="w-full h-36 overflow-hidden">
                <img src="/images/boots-on-grass.svg" alt="" className="w-full h-full object-cover" />
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