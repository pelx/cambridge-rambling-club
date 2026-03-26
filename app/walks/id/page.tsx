import { walks } from '@/lib/walks';

export default function WalkDetail({ params }: any) {
  const walk = walks.find(w => w.id === params.id);

  if (!walk) return <div>Not found</div>;

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        {walk.title}
      </h1>

      <img src={walk.image} className="rounded-xl mb-6" />

      <p className="mb-4">{walk.description}</p>

      <ul className="space-y-2">
        <li>Date: {walk.date}</li>
        <li>Distance: {walk.distance} km</li>
        <li>Difficulty: {walk.difficulty}</li>
      </ul>
    </section>
  );
}