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

            <p className="text-sm text-gray-600 mb-2">
                {walk.date} • {walk.time}
            </p>

            <p className="text-sm mb-2">
                <strong>Level:</strong> {walk.level}
            </p>

            <p className="text-sm mb-2">
                <strong>Leader:</strong> {walk.leader}
            </p>

            <p className="text-gray-700 text-sm">
                {walk.description}
            </p>

        </div>
    );
}

