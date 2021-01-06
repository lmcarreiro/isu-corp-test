import { ContactModel } from './contact.model';

export interface ReservationModel {
  id: number;
  description: string;
  contact: ContactModel;
}
