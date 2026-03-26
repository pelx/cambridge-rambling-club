function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

type Props = {
    walk: {
        title: string;
        date: string;
        time: string;
        level: string;
        leader: string;
        description: string;
    };
};

export default function WalkCard({ walk }: Props) {
    return (
        <div className="border rounded-xl p-5 shadow-sm bg-white">

            <h3 className="text-lg font-semibold mb-2">
                {walk.title}
            </h3>

            <p className="text-sm text-gray-500 mb-1">
                🗓 {formatDate(walk.date)} • {walk.time}
            </p>

            <p className="text-sm mb-2">
                <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${ walk.level === 'A'
                            ? 'bg-red-100 text-red-700'
                            : walk.level === 'B'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                        }`}
                >
                    Level {walk.level}
                </span>
            </p>

            <p className="text-sm text-gray-600 mb-2">
                👤 {walk.leader}
            </p>

            <p className="text-gray-700 text-sm">
                {walk.description}
            </p>

        </div>
    );
}

