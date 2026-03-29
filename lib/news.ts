import data from '../data/news.json';

export type NewsPost = {
  id: number;
  postDate: string;    // DD/MM/YYYY
  author: string;
  title: string;
  content: string;
};

export const news = data as NewsPost[];

export function getNewsPostById(id: number): NewsPost | undefined {
  return news.find(n => n.id === id);
}