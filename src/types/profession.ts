export type ProfessionCategory = 
  | 'Esthétique'
  | 'Massage'
  | 'Médical'
  | 'Artisan BTP'
  | 'Autres';

export interface Profession {
  id: string;
  category: ProfessionCategory;
  name: string;
  description?: string;
}

export const PROFESSION_CATEGORIES: ProfessionCategory[] = [
  'Esthétique',
  'Massage',
  'Médical',
  'Artisan BTP',
  'Autres'
];

export const PROFESSIONS: Profession[] = [
  { id: '1', category: 'Esthétique', name: 'Esthéticienne' },
  { id: '2', category: 'Massage', name: 'Masseur/Masseuse' },
  { id: '3', category: 'Médical', name: 'Infirmier/Infirmière' },
  { id: '4', category: 'Médical', name: 'Kinésithérapeute' },
  { id: '5', category: 'Artisan BTP', name: 'Plombier' },
  { id: '6', category: 'Artisan BTP', name: 'Électricien' },
  { id: '7', category: 'Autres', name: 'Coach sportif' }
];