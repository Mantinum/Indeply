import React, { useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { ProfessionalProfile } from '../../types/user';

interface SearchResultsProps {
  results: ProfessionalProfile[];
  loading: boolean;
  error: string | null;
}

export default function SearchResults({ results, loading, error }: SearchResultsProps) {
  // Log des props à chaque changement
  useEffect(() => {
    console.log('SearchResults - État actuel:', {
      resultsLength: results.length,
      hasResults: results.length > 0,
      loading,
      error
    });
    
    if (results.length > 0) {
      console.log('Premier résultat:', results[0]);
    }
  }, [results, loading, error]);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="mt-8 text-center p-8 bg-white rounded-xl border border-gray-200">
        <p className="text-secondary-600">Aucun professionnel trouvé pour cette recherche</p>
        <p className="text-sm text-secondary-500 mt-2">
          Essayez de modifier vos critères de recherche ou d'élargir votre zone géographique
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((professional) => (
          <div 
            key={professional.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-secondary-900">
                    {professional.first_name} {professional.last_name}
                  </h3>
                  <p className="text-secondary-600">{professional.profession}</p>
                  {professional.business_name && (
                    <p className="text-sm text-secondary-500 mt-1">{professional.business_name}</p>
                  )}
                </div>
              </div>

              {professional.business_description && (
                <p className="mt-3 text-sm text-secondary-600 line-clamp-2">
                  {professional.business_description}
                </p>
              )}

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
                onClick={() => console.log('Voir les disponibilités de:', professional)}
                className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Voir les disponibilités
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}