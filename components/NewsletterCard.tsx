// import Image from 'next/image';
import { Newsletter } from '../lib/newsletters';

type Props = {
    newsletter: Newsletter;
};

export default function NewsletterCard({ newsletter }: Props) {
    return (
        <a
            href={newsletter.file}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <h3 className="text-lg font-semibold mb-2">
                {newsletter.season} {newsletter.year}
            </h3>

            <p className="text-foreground/70 text-sm">
                Club Newsletter
            </p>

            <p className="mt-3 text-green-600 text-sm font-medium">
                View PDF →
            </p>
        </a>
    );
}