export interface Professional {
  id: string;
  name: string;
  profession: string;
  speciality?: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string;
  notes: string;
  image: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  duration: number; // en minutes
  status: 'Planifié' | 'En cours' | 'Terminé' | 'Annulé';
  notes?: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // en minutes
  price: number;
  category: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}