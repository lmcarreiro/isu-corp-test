export interface ReservationModel {
  id: number;
  description: string;
  contact: {
    id: number;
    name: string;
    type: string;
    phone: string;
    birthDate: string;
  };
}
