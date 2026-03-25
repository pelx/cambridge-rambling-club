export type Walk = {
  id: string;
  title: string;
  date: string;
  distance: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  location: string;
  description: string;
  image: string;
};

export const walks: Walk[] = [
  {
    id: 'grantchester-loop',
    title: 'Grantchester Loop',
    date: '2026-05-05',
    distance: 8,
    difficulty: 'Easy',
    location: 'Grantchester',
    description: 'Walk along the river to a lovely village.',
    image: '/images/walk1.jpg',
  },
];
