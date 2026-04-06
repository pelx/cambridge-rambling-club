import data from '../data/newsletters.json';

export type Newsletter = {
  id: number;
  season: 'Winter' | 'Spring' | 'Summer' | 'Autumn';
  year: number;
  file: string;
  image?: string;
};

// cast data
export const newsletters = data as Newsletter[];