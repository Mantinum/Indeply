import { PROFESSIONS } from '../types/profession';

export const normalizeProfession = (profession: string): string => {
  return profession.trim().toLowerCase();
};

export const validateProfession = (profession: string): boolean => {
  const normalizedProfession = normalizeProfession(profession);
  return PROFESSIONS.some(p => normalizeProfession(p.name) === normalizedProfession);
};

export const getProfessionByName = (professionName: string) => {
  const normalizedName = normalizeProfession(professionName);
  return PROFESSIONS.find(p => normalizeProfession(p.name) === normalizedName);
};