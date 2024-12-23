import { supabase } from '../../lib/supabase';

export const signIn = async (email: string, password: string) => {
  try {
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) throw signInError;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;
    return { user: authData.user, profile };
  } catch (error) {
    console.error('Error during signin:', error);
    throw error;
  }
};