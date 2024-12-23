import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface OpeningHour {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface Break {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  breakType: 'lunch' | 'break';
}

interface Holiday {
  startDate: string;
  endDate: string;
  description?: string;
}

export function useAvailabilityManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateOpeningHours = async (openingHours: OpeningHour[]) => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      // Supprimer les anciens horaires
      await supabase
        .from('opening_hours')
        .delete()
        .eq('professional_id', session.session.user.id);

      // Ajouter les nouveaux horaires
      const { error: insertError } = await supabase
        .from('opening_hours')
        .insert(
          openingHours.map(hour => ({
            professional_id: session.session.user.id,
            day_of_week: hour.dayOfWeek,
            start_time: hour.startTime,
            end_time: hour.endTime
          }))
        );

      if (insertError) throw insertError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour des horaires');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBreaks = async (breaks: Break[]) => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      // Supprimer les anciennes pauses
      await supabase
        .from('breaks')
        .delete()
        .eq('professional_id', session.session.user.id);

      // Ajouter les nouvelles pauses
      const { error: insertError } = await supabase
        .from('breaks')
        .insert(
          breaks.map(brk => ({
            professional_id: session.session.user.id,
            day_of_week: brk.dayOfWeek,
            start_time: brk.startTime,
            end_time: brk.endTime,
            break_type: brk.breakType
          }))
        );

      if (insertError) throw insertError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour des pauses');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateHolidays = async (holidays: Holiday[]) => {
    try {
      setLoading(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error('Non authentifié');

      // Supprimer les anciens congés
      await supabase
        .from('holidays')
        .delete()
        .eq('professional_id', session.session.user.id);

      // Ajouter les nouveaux congés
      const { error: insertError } = await supabase
        .from('holidays')
        .insert(
          holidays.map(holiday => ({
            professional_id: session.session.user.id,
            start_date: holiday.startDate,
            end_date: holiday.endDate,
            description: holiday.description
          }))
        );

      if (insertError) throw insertError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour des congés');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateOpeningHours,
    updateBreaks,
    updateHolidays
  };
}