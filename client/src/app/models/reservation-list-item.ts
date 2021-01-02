export interface ReservationListItem {
  id: number;
  name: string;
  date: string;
  ranking: 0 | 1 | 2 | 3 | 4 | 5;
  favorite: boolean;
}
