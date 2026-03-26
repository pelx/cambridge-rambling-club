import { walks } from '../../../lib/walks';
import Navbar from '../../../components/Navbar';
import CTASection from '../../../components/CTASection';

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function WalkDetailPage({ params }: Props) {

    // ✅ unwrap params
    const { id } = await params;

    // ✅ now safe to use
    const walk = walks.find(
        (w) => String(w.id) === id
    );

    if (!walk) {
        return (
            <>
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Walk not found
                    </h1>
                </div>
            </>
        );
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }

    return (
        <>
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-16">

                {/* Image */}
                <img
                    src={walk.image}
                    alt={walk.title}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                />

                {/* Title */}
                <h1 className="text-3xl font-bold mb-4">
                    {walk.title}
                </h1>

                {/* Meta */}
                <p className="text-gray-600 mb-2">
                    🗓 {formatDate(walk.date)} • {walk.time}
                </p>

                <p className="mb-2">
                    <strong>Level:</strong> {walk.level}
                </p>

                <p className="mb-4">
                    👤 {walk.leader}
                </p>

                <p className="text-gray-700">
                    {walk.description}
                </p>

            </div>

            <CTASection />
        </>
    );
}
