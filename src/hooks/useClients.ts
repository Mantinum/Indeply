import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useClients() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<any[]>([]);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      const { data, error: clientsError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client');

      if (clientsError) throw clientsError;
      setClients(data || []);
    } catch (err) {
      setError('Erreur lors du chargement des clients');
      console.error('Erreur détaillée:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const addClient = async (clientData: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      // Création du compte client avec un mot de passe temporaire
      const tempPassword = Math.random().toString(36).slice(-8);
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: clientData.email,
        password: tempPassword,
        options: {
          data: {
            first_name: clientData.firstName,
            last_name: clientData.lastName,
            role: 'client'
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('Erreur lors de la création du compte');

      // Création du profil client
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: clientData.email,
          first_name: clientData.firstName,
          last_name: clientData.lastName,
          role: 'client',
          phone: clientData.phone
        })
        .select()
        .single();

      if (profileError) throw profileError;

      await loadClients();
      return profile;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'ajout du client';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    clients,
    addClient,
    loadClients
  };
}