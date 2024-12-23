import { supabase } from '../../lib/supabase';

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error during signout:', error);
    throw error;
  }
};