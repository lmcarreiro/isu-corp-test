export interface ReservationModel {
  id: number;
  description: string;
  contact: {
    id: number;
    name: string;
    typeId: number;
    phone: string;
    birthDate: string;
  };
}
