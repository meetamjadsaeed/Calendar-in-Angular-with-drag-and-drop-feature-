export interface Appointment {
  id: number;
  date: string;
  description: string;
}

export interface Appointments {
  [key: string]: Appointment[];
}
