export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  photos: string[];
}

export interface ProfessionalLocation extends Location {
  professionalId: string;
  services: string[]; // IDs des services disponibles à cet endroit
  openingHours: {
    [key: string]: { // 'monday', 'tuesday', etc.
      open: string;
      close: string;
    };
  };
}