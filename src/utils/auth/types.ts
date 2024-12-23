import type { UserRole } from '../../types/user';

export interface UserData {
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  profession?: string;
  businessName?: string;
  businessDescription?: string;
  address?: string;
  postalCode?: string;
  city?: string;
}

export interface AuthResponse {
  user: any;
  profile: any;
  role: UserRole;
}