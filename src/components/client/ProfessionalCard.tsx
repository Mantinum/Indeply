import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';
import { ProfessionalProfile } from '../../types/user';

interface ProfessionalCardProps {
  professional: ProfessionalProfile;
}

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={professional.avatar_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=120&h=120'}
          alt={`${professional.first_name} ${professional.last_name}`}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-secondary-900">
              {professional.first_name} {professional.last_name}
            </h3>
            <p className="text-secondary-600">{professional.profession}</p>
            {professional.business_name && (
              <p className="text-sm text-secondary-500">{professional.business_name}</p>
            )}
          </div>
          {professional.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="font-medium text-secondary-900">{professional.rating}</span>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {(professional.city || professional.postal_code) && (
            <div className="flex items-center gap-2 text-sm text-secondary-600">
              <MapPin className="w-4 h-4" />
              <span>
                {professional.city}
                {professional.postal_code && ` (${professional.postal_code})`}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <Clock className="w-4 h-4" />
            <span>Disponible sur rendez-vous</span>
          </div>
        </div>

        <button
          onClick={() => {}} // À implémenter avec la navigation
          className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Voir les disponibilités
        </button>
      </div>
    </div>
  );
}