import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Service } from '../types';

export function useServices() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addService = async (serviceData: Omit<Service, 'id'>) => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      const { data, error: serviceError } = await supabase
        .from('services')
        .insert({
          ...serviceData,
          professional_id: session.session.user.id
        })
        .select()
        .single();

      if (serviceError) throw serviceError;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout du service');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (deleteError) throw deleteError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addService,
    deleteService
  };
}