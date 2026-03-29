import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { news } from '../../lib/news';

export default function ClubNewsPage() {
  const sorted = [...news].sort((a, b) => {
    const parse = (d: string) => {
      const [dd, mm, yyyy] = d.split('/');
      return new Date(`${yyyy}-${mm}-${dd}`).getTime();
    };
    return parse(b.postDate) - parse(a.postDate);
  });

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Club News</h1>
        <p className="text-stone-500 mb-8">Latest announcements from the club.</p>

        <div className="flex flex-col gap-6">
          {sorted.map(post => (
            <Link key={post.id} href={`/club-news/${post.id}`}>
              <div className="bg-white border border-stone-200 rounded-xl p-6 hover:border-stone-300 transition-colors cursor-pointer">
                <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">
                  {post.postDate} · {post.author}
                </p>
                <h2 className="text-lg font-semibold text-stone-900 mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed">
                  {post.content}
                </p>
                <p className="mt-3 text-green-700 text-sm font-medium">Read more →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}