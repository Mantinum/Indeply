import React from 'react';
import { Filter } from 'lucide-react';
import { PROFESSION_CATEGORIES } from '../../types/profession';

interface ProfessionalFilterProps {
  onFilterChange: (filters: any) => void;
}

export default function ProfessionalFilter({ onFilterChange }: ProfessionalFilterProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-medium text-secondary-900 mb-4">Filtres</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Catégorie
          </label>
          <select
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Toutes les catégories</option>
            {PROFESSION_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Distance
          </label>
          <select
            onChange={(e) => onFilterChange({ distance: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
            <option value="50">50 km</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Disponibilité
          </label>
          <select
            onChange={(e) => onFilterChange({ availability: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="any">Toutes les disponibilités</option>
            <option value="today">Aujourd'hui</option>
            <option value="tomorrow">Demain</option>
            <option value="week">Cette semaine</option>
          </select>
        </div>
      </div>
    </div>
  );
}