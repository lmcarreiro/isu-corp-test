export interface ReservationListItem {
  id: number;
  contactName: string;
  reservationDate: string;
  ranking: 0 | 1 | 2 | 3 | 4 | 5;
  favorite: boolean;
}
