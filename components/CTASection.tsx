export default function CTASection() {
    return (
        <section className="bg-green-800 text-white py-16 mt-16">
            <div className="max-w-6xl mx-auto px-6">

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between text-center md:text-left">

                    {/* Text */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                            Interested in joining?
                        </h2>
                        <p className="text-green-100">
                            Come along to your first walk — no experience needed.
                        </p>
                    </div>

                    {/* Button */}
                    <a
                        href="/join"
                        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition"
                    >
                        Learn More →
                    </a>

                </div>

            </div>
        </section>
    );
}
