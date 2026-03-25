import Navbar from '../../components/Navbar';
import CTASection from '../../components/CTASection';

export default function JoinPage() {
    return (
        <>
            <Navbar />

            <section className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                    Join the Club
                </h1>

                <p className="text-lg text-gray-700 mb-8">
                    Everyone is welcome — no experience needed. Just turn up and walk with us.
                </p>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-6 mb-12 text-center">
                    <div>
                        <div className="text-2xl font-bold mb-2">1</div>
                        <p>Turn up to a walk</p>
                    </div>

                    <div>
                        <div className="text-2xl font-bold mb-2">2</div>
                        <p>Enjoy the walk</p>
                    </div>

                    <div>
                        <div className="text-2xl font-bold mb-2">3</div>
                        <p>Join for £1/year</p>
                    </div>
                </div>

                {/* Info */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="font-semibold mb-3">What to bring</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Comfortable walking shoes</li>
                        <li>Water</li>
                        <li>Lunch or snacks</li>
                        <li>Weather-appropriate clothing</li>
                    </ul>
                </div>
            </section>

            <CTASection />
        </>
    );
}
