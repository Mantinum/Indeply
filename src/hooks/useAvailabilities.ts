import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Availability {
  date: string;
  slots: string[];
}

export function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAvailabilities = async (professionalId: string, date: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: availabilityError } = await supabase
        .from('availabilities')
        .select('*')
        .eq('professional_id', professionalId)
        .eq('date', date)
        .single();

      if (availabilityError) throw availabilityError;
      return data?.slots || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des disponibilités');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAvailabilities
  };
}