import data from '../data/holidays.json';

export type Holiday = {
  id: number;
  startDate: string;   // DD/MM/YYYY
  endDate: string;     // DD/MM/YYYY
  leader: string;
  title: string;
  content: string;
};

export const holidays = data as Holiday[];

export function getHolidayById(id: number): Holiday | undefined {
  return holidays.find(h => h.id === id);
}