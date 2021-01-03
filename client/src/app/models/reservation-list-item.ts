export interface ReservationListItem {
  id: number;
  contactId: number;
  date: string;
  ranking: 0 | 1 | 2 | 3 | 4 | 5;
  favorite: boolean;
}
