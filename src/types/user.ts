export type UserRole = 'client' | 'professional';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface ClientProfile extends User {
  role: 'client';
  appointments: string[]; // IDs des rendez-vous
  favoriteLocations: string[]; // IDs des lieux favoris
}

export interface ProfessionalProfile extends User {
  role: 'professional';
  profession: string;
  speciality?: string;
  description?: string;
  locations: string[]; // IDs des lieux
  services: string[]; // IDs des services
  rating: number;
  reviewCount: number;
}