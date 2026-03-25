type Props = {
    title: string;
    subtitle?: string;
    image: string;
};

export default function PageHeader({ title, subtitle, image }: Props) {
    return (
        <div className="relative h-[300px] md:h-[350px] flex items-center justify-center text-white">

            {/* Background image */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <h1 className="text-3xl md:text-4xl font-bold">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-2 text-sm md:text-base text-gray-200">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
