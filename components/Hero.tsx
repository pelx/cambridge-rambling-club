export default function Hero() {
    return (
        <section className="relative h-[500px] flex items-center">

            {/* Background image */}
            <img
                src="/images/hero.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Walking group"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Explore the countryside.
                    <br />
                    Meet great people.
                </h1>

                <p className="mb-6 text-lg">
                    Weekly social walks around Cambridge & beyond
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                    <a
                        href="/walks"
                        className="bg-green-700 px-6 py-3 rounded-lg"
                    >
                        View Walks
                    </a>

                    <a
                        href="/join"
                        className="bg-white text-black px-6 py-3 rounded-lg"
                    >
                        Join Your First Walk
                    </a>
                </div>
            </div>
        </section>
    );
}
