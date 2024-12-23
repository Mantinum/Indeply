import React, { useState } from 'react';
import ProfessionalSearch from '../../components/client/ProfessionalSearch';
import SearchResults from '../../components/client/SearchResults';
import { useProfessionalSearch } from '../../hooks/useProfessionalSearch';
import { supabase } from '../../lib/supabase';

export default function FindProfessional() {
  const { loading, error, results, searchProfessionals } = useProfessionalSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: { profession: string; location?: string }) => {
    console.log('FindProfessional - handleSearch appelé avec:', params);
    
    // Vérification de la connexion Supabase
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Session Supabase:', session ? 'Connecté' : 'Non connecté');

    setHasSearched(true);
    try {
      await searchProfessionals(params);
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">
            Trouvez un professionnel près de chez vous
          </h1>
          <p className="text-secondary-600">
            {results.length > 0 
              ? `${results.length} professionnel${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`
              : 'Recherchez par profession et localisation'}
          </p>
        </div>

        <ProfessionalSearch onSearch={handleSearch} />
        
        {loading && (
          <div className="mt-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {hasSearched && !loading && !error && (
          <SearchResults 
            results={results} 
            loading={loading} 
            error={error} 
          />
        )}
      </div>
    </div>
  );
}