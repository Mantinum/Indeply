import { supabase } from '../../lib/supabase';
import type { UserData, AuthResponse } from './types';

export const signUp = async (
  email: string,
  password: string,
  userData: UserData
): Promise<AuthResponse> => {
  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role
        }
      }
    });

    if (signUpError) throw signUpError;
    if (!authData.user) throw new Error('No user data returned');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: authData.user.email!,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role,
        phone: userData.phone,
        profession: userData.profession,
        business_name: userData.businessName,
        business_description: userData.businessDescription,
        address: userData.address,
        postal_code: userData.postalCode,
        city: userData.city
      })
      .select()
      .single();

    if (profileError) throw profileError;

    return {
      user: authData.user,
      profile,
      role: userData.role
    };
  } catch (err) {
    console.error('Error during signup:', err);
    throw err;
  }
};