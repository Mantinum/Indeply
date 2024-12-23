import { supabase } from '../../lib/supabase';

export const getCurrentUser = async () => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw profileError;
    return { user: session.user, profile };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};