'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [ open, setOpen ] = useState(false);
    const pathname = usePathname();

    // helper for active links
    const linkClass = (path: string) =>
        `transition ${ pathname === path
            ? 'text-green-600 font-semibold'
            : 'hover:text-green-600'
        }`;

    return (
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    Rambling Club
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex gap-6">
                    <Link href="/" className={linkClass('/')}>
                        Home
                    </Link>
                    <Link href="/news" className={linkClass('/news')}>
                        News
                    </Link>
                    <Link href="/walks" className={linkClass('/walks')}>
                        Walks
                    </Link>
                    <Link href="/newsletters" className={linkClass('/newsletters')}>
                        Newsletters
                    </Link>
                    <Link href="/join" className={linkClass('/join')}>
                        Join
                    </Link>
                </div>

                {/* Mobile button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-4 border-t bg-white">

                    <Link
                        href="/"
                        className={linkClass('/')}
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/news"
                        className={linkClass('/news')}
                        onClick={() => setOpen(false)}
                    >
                        News
                    </Link>
                    <Link
                        href="/walks"
                        className={linkClass('/walks')}
                        onClick={() => setOpen(false)}
                    >
                        Walks
                    </Link>

                    <Link
                        href="/newsletters"
                        className={linkClass('/newsletters')}
                        onClick={() => setOpen(false)}
                    >
                        Newsletters
                    </Link>

                    <Link
                        href="/join"
                        className={linkClass('/join')}
                        onClick={() => setOpen(false)}
                    >
                        Join
                    </Link>

                </div>
            )}
        </nav>
    );
}
