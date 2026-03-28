import data from '../data/walks.json';

export type Walk = {
  id: number;
  title: string;
  date: string;           // YYYY-MM-DD
  startTime: string;      // e.g. "09:30"
  level: 'A' | 'B' | 'C';
  leader: string;
  phone?: string;
  drivingInstructions?: string;
  parking?: string;
  walkStart?: string;
  description: string;
  image?: string;
};

export const walks = data as Walk[];

export function getWalkById(id: number): Walk | undefined {
  return walks.find(w => w.id === id);
}