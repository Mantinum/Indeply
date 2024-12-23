import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAvailabilities } from '../../hooks/useAvailabilities';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';

export default function BookingPage() {
  const { professionalId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [professional, setProfessional] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const { loading, error, getAvailabilities } = useAvailabilities();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    const loadProfessional = async () => {
      if (!professionalId) return;

      const { data } = await supabase
        .from('profiles')
        .select(`
          *,
          services (*)
        `)
        .eq('id', professionalId)
        .single();

      if (data) {
        setProfessional(data);
        setServices(data.services || []);
      }
    };

    loadProfessional();
  }, [professionalId]);

  useEffect(() => {
    const loadAvailabilities = async () => {
      if (!professionalId) return;
      const slots = await getAvailabilities(professionalId, format(selectedDate, 'yyyy-MM-dd'));
      setAvailableSlots(slots);
    };

    loadAvailabilities();
  }, [professionalId, selectedDate]);

  if (!professional) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">
            Réserver avec {professional.firstName} {professional.lastName}
          </h1>
          <p className="text-secondary-600 mb-6">{professional.profession}</p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="font-medium text-secondary-900 mb-4">Choisir une date</h2>
              {/* Intégrer un composant de calendrier ici */}
            </div>

            <div>
              <h2 className="font-medium text-secondary-900 mb-4">Horaires disponibles</h2>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map(slot => (
                  <button
                    key={slot}
                    className="flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-medium text-secondary-900 mb-4">Services disponibles</h2>
            <div className="space-y-2">
              {services.map(service => (
                <button
                  key={service.id}
                  className="w-full p-4 rounded-lg border border-gray-200 text-left hover:border-primary-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-secondary-900">{service.name}</h3>
                      <p className="text-sm text-secondary-600">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-secondary-900">{service.price} €</p>
                      <p className="text-sm text-secondary-600">{service.duration} min</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}