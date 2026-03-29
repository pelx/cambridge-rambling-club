import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { news, getNewsPostById } from '../../../lib/news';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return news.map(n => ({ id: String(n.id) }));
}

export default async function NewsPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = getNewsPostById(Number(id));
    if (!post) notFound();

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

                <Link href="/news" className="text-sm text-stone-400 hover:text-stone-600 transition-colors mb-6 inline-block">
                    ← Back to News
                </Link>

                <p className="text-xs text-stone-400 uppercase tracking-wide mb-3">
                    {post.postDate} · {post.author}
                </p>

                <h1 className="text-3xl font-bold text-stone-900 mb-6 leading-snug">
                    {post.title}
                </h1>

                <div className="bg-white border border-stone-200 rounded-xl p-6">
                    <p className="text-stone-700 leading-relaxed">
                        {post.content.split(/([\w.-]+@[\w.-]+\.\w+)/).map((part, i) =>
                            /[\w.-]+@[\w.-]+\.\w+/.test(part) ? (
                                <a key={i} href={`mailto:${ part }`} className="text-green-700 underline hover:text-green-900">
                                    {part}
                                </a>
                            ) : (
                                part
                            )
                        )}
                    </p>
                </div>

            </div>
        </>
    );
}




