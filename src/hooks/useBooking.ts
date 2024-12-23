import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface BookingData {
  professionalId: string;
  serviceId: string;
  date: string;
  time: string;
}

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: BookingData) => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      // Vérifier la disponibilité
      const { data: availability } = await supabase
        .from('availabilities')
        .select('slots')
        .eq('professional_id', bookingData.professionalId)
        .eq('date', bookingData.date)
        .single();

      if (!availability?.slots.includes(bookingData.time)) {
        throw new Error('Ce créneau n\'est plus disponible');
      }

      // Créer le rendez-vous
      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          client_id: session.session.user.id,
          professional_id: bookingData.professionalId,
          service_id: bookingData.serviceId,
          date: bookingData.date,
          time: bookingData.time,
          status: 'Planifié'
        })
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      // Mettre à jour les disponibilités
      const updatedSlots = availability.slots.filter(slot => slot !== bookingData.time);
      const { error: availabilityError } = await supabase
        .from('availabilities')
        .update({ slots: updatedSlots })
        .eq('professional_id', bookingData.professionalId)
        .eq('date', bookingData.date);

      if (availabilityError) throw availabilityError;

      return appointment;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la réservation';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createBooking
  };
}