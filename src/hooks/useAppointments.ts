import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Appointment } from '../types';

export function useAppointments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.session.user.id)
        .single();

      let query = supabase
        .from('appointments')
        .select(`
          *,
          client:profiles!appointments_client_id_fkey(first_name, last_name),
          service:professional_services!appointments_service_id_fkey(
            id,
            name,
            duration,
            price
          )
        `);

      if (profile?.role === 'client') {
        query = query.eq('client_id', session.session.user.id);
      } else {
        query = query.eq('professional_id', session.session.user.id);
      }

      const { data, error: appointmentsError } = await query.order('date', { ascending: true });

      if (appointmentsError) throw appointmentsError;

      const formattedAppointments = data?.map(apt => ({
        id: apt.id,
        clientId: apt.client_id,
        clientName: `${apt.client.first_name} ${apt.client.last_name}`,
        service: apt.service.name,
        date: apt.date,
        time: apt.time,
        duration: apt.service.duration,
        status: apt.status,
        price: apt.service.price,
        notes: apt.notes
      })) || [];

      setAppointments(formattedAppointments);
    } catch (err) {
      setError('Erreur lors du chargement des rendez-vous');
      console.error('Erreur détaillée:', err);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: {
    clientId: string;
    serviceId: string;
    date: string;
    time: string;
    notes?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      // Validate UUIDs
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(appointmentData.clientId)) {
        throw new Error('ID client invalide');
      }
      if (!uuidRegex.test(appointmentData.serviceId)) {
        throw new Error('ID service invalide');
      }

      // Create appointment
      const { data, error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          client_id: appointmentData.clientId,
          professional_id: session.session.user.id,
          service_id: appointmentData.serviceId,
          date: appointmentData.date,
          time: appointmentData.time,
          notes: appointmentData.notes,
          status: 'Planifié'
        })
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      // Reload appointments
      await loadAppointments();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la création du rendez-vous';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return {
    loading,
    error,
    appointments,
    createAppointment,
    loadAppointments
  };
}