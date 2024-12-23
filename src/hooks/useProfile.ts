import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        setProfile(null);
        return null;
      }

      // Get profile with retry mechanism
      let profile = null;
      let retries = 3;

      while (retries > 0 && !profile) {
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.session.user.id)
          .maybeSingle();

        if (!profileError && data) {
          profile = data;
          break;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        retries--;
      }

      // If profile still doesn't exist after retries, create it
      if (!profile) {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: session.session.user.id,
            email: session.session.user.email,
            first_name: session.session.user.user_metadata?.first_name || '',
            last_name: session.session.user.user_metadata?.last_name || '',
            role: session.session.user.user_metadata?.role || 'client'
          })
          .select()
          .single();

        if (createError) throw createError;
        profile = newProfile;
      }

      setProfile(profile);
      return profile;
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Erreur lors du chargement du profil');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', session.session.user.id)
        .select()
        .single();

      if (updateError) throw updateError;
      setProfile(data);
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Erreur lors de la mise à jour du profil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    loading,
    error,
    profile,
    loadProfile,
    updateProfile
  };
}