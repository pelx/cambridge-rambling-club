'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const linkClass = (path: string) =>
        `transition ${ pathname === path
            ? 'text-green-700 font-semibold'
            : 'text-gray-700 hover:text-green-700'
        }`;

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-lg font-semibold">
                    Cambridge Rambling Club
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-6">

                    <Link href="/" className={linkClass('/')}>
                        Home
                    </Link>

                    <Link href="/walks" className={linkClass('/walks')}>
                        Walks
                    </Link>

                    <Link href="/join" className={linkClass('/join')}>
                        Join
                    </Link>

                    {/* CTA Button */}
                    <Link
                        href="/walks"
                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
                    >
                        Join a Walk
                    </Link>

                </div>

            </div>
        </nav>
    );
}
