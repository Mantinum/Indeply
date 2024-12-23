import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Service } from '../types';

export function useProfessionalServices(professionalId?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('professional_services')
        .select(`
          id,
          name,
          description,
          duration,
          price,
          category
        `);

      if (professionalId) {
        query = query.eq('professional_id', professionalId);
      } else {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.user) throw new Error('Non authentifié');
        query = query.eq('professional_id', session.session.user.id);
      }

      const { data, error: servicesError } = await query;

      if (servicesError) throw servicesError;

      const formattedServices = data?.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description || '',
        duration: service.duration,
        price: service.price,
        category: service.category
      })) || [];

      setServices(formattedServices);
      return formattedServices;
    } catch (err) {
      console.error('Erreur détaillée:', err);
      setError('Erreur lors du chargement des services');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [professionalId]);

  const addService = async (serviceData: Omit<Service, 'id'>) => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      const { data, error: serviceError } = await supabase
        .from('professional_services')
        .insert({
          ...serviceData,
          professional_id: session.session.user.id
        })
        .select()
        .single();

      if (serviceError) throw serviceError;

      await loadServices();
      return data;
    } catch (err) {
      console.error('Erreur détaillée:', err);
      setError('Erreur lors de l\'ajout du service');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    services,
    loadServices,
    addService
  };
}