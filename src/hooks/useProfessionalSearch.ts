import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ProfessionalProfile } from '../types/user';

interface SearchParams {
  profession?: string;
  location?: string;
}

export function useProfessionalSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ProfessionalProfile[]>([]);

  const searchProfessionals = async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Paramètres de recherche:', params);

      let query = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'professional');

      if (params.profession) {
        // Recherche exacte de la profession
        query = query.eq('profession', params.profession);
      }

      if (params.location) {
        query = query.or(`postal_code.eq.${params.location},city.ilike.%${params.location}%`);
      }

      const { data, error: searchError } = await query;
      console.log('Résultats de la requête:', data);

      if (searchError) throw searchError;

      const formattedResults = (data || []).map(profile => ({
        ...profile,
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        role: profile.role,
        profession: profile.profession,
        phone: profile.phone || undefined,
        avatar: profile.avatar_url || undefined,
      }));

      console.log('Résultats formatés:', formattedResults);
      setResults(formattedResults);
    } catch (err) {
      console.error('Erreur de recherche:', err);
      setError('Une erreur est survenue lors de la recherche');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    results,
    searchProfessionals
  };
}