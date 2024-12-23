import { supabase } from '../lib/supabase';
import { UserRole } from '../types/user';

export const signUp = async (
  email: string,
  password: string,
  userData: {
    firstName: string;
    lastName: string;
    role: UserRole;
    phone?: string;
    profession?: string;
    businessName?: string;
    businessDescription?: string;
    address?: string;
    postalCode?: string;
    city?: string;
  }
) => {
  try {
    // 1. Create auth user
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

    // 2. Wait for auth user to be fully created
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. Create profile with retry mechanism
    let profile = null;
    let retries = 3;
    
    while (retries > 0 && !profile) {
      try {
        const { data, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: authData.user.email!,
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
            phone: userData.phone,
            // Store profession exactly as provided without normalization
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
        profile = data;
      } catch (err) {
        retries--;
        if (retries === 0) throw err;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

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

// Rest of the file remains unchanged...