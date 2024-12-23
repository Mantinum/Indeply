import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { PROFESSIONS } from '../../types/profession';

interface ProfessionalSearchProps {
  onSearch: (params: { profession: string; location?: string }) => void;
}

export default function ProfessionalSearch({ onSearch }: ProfessionalSearchProps) {
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profession) return;
    
    console.log('Envoi de la recherche:', {
      profession,
      location,
    });
    
    onSearch({ profession, location });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <Search className="w-4 h-4 inline-block mr-2" />
            Profession
          </label>
          <select
            value={profession}
            onChange={(e) => {
              setProfession(e.target.value);
              console.log('Profession sélectionnée:', e.target.value);
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="">Sélectionnez une profession</option>
            {PROFESSIONS.map(p => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <MapPin className="w-4 h-4 inline-block mr-2" />
            Ville ou code postal (optionnel)
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Paris, 75001"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={!profession}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}