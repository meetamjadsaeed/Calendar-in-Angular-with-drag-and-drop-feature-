export interface Appointment {
  id: number | null;
  date: string | Date;
  description: string;
}

export interface Appointments {
  [key: string]: Appointment[];
}
