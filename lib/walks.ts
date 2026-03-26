export type Walk = {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  level: 'A' | 'B' | 'C';
  leader: string;
  description: string;
};

export const walks: Walk[] = [
  {
    id: 1,
    title: "Cambridge to Grantchester",
    date: "2026-04-10",
    time: "10:00",
    level: "B",
    leader: "John Smith",
    description: "A scenic riverside walk with pub stop."
  },
  {
    id: 2,
    title: "Wandlebury Loop",
    date: "2026-03-01",
    time: "09:30",
    level: "A",
    leader: "Sarah Brown",
    description: "Challenging hills with woodland views."
  },
];
