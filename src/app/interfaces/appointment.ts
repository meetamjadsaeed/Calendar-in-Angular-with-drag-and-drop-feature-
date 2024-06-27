export interface Appointment {
  id: number;
  date: string;
  description: string;
  time: string;
}

export interface Appointments {
  [key: string]: Appointment[];
}
