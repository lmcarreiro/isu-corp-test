import { ReservationListItem } from '../models/reservation-list-item';

// prettier-ignore
export const RESERVATIONS: ReservationListItem[] = [
  { id: 1, contactName: 'Second Dock'  , reservationDate: '2020-05-17T21:00:00', ranking: 4, favorite: true , },
  { id: 2, contactName: 'Primer Puerto', reservationDate: '2020-05-18T20:00:00', ranking: 3, favorite: false, },
  { id: 3, contactName: 'Stella'       , reservationDate: '2020-05-20T19:00:00', ranking: 2, favorite: false, },
  { id: 4, contactName: 'Island Creek' , reservationDate: '2020-05-21T20:00:00', ranking: 2, favorite: false, },
  { id: 5, contactName: 'Island Creek' , reservationDate: '2020-05-24T21:00:00', ranking: 1, favorite: true , },
  { id: 6, contactName: 'Fogo the Chao', reservationDate: '2020-05-17T21:00:00', ranking: 2, favorite: true , },
  { id: 7, contactName: 'Fogo the Chao', reservationDate: '2020-05-25T20:00:00', ranking: 0, favorite: false, },
  { id: 8, contactName: 'Fontana'      , reservationDate: '2020-05-23T20:00:00', ranking: 2, favorite: false, },
];
