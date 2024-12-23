import React, { useState } from 'react';
import { Calendar, Plus, Filter } from 'lucide-react';
import NewAppointmentModal from '../components/appointments/NewAppointmentModal';
import { useAppointments } from '../hooks/useAppointments';
import { useProfessionalServices } from '../hooks/useProfessionalServices';
import AppointmentList from '../components/appointments/AppointmentList';

export default function Appointments() {
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const { appointments, loading, error, createAppointment } = useAppointments();
  const { services, loading: servicesLoading } = useProfessionalServices();

  const handleNewAppointment = async (appointmentData: any) => {
    try {
      await createAppointment(appointmentData);
      setShowNewAppointmentModal(false);
    } catch (err) {
      console.error('Erreur lors de la création du rendez-vous:', err);
    }
  };

  if (loading || servicesLoading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Rendez-vous</h1>
            <p className="text-secondary-600">Gérez votre agenda et vos rendez-vous</p>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtrer</span>
            </button>
            <button
              onClick={() => setShowNewAppointmentModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau rendez-vous</span>
            </button>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border border-gray-200">
            <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Aucun rendez-vous</h3>
            <p className="text-secondary-600">
              Commencez par créer votre premier rendez-vous en cliquant sur le bouton "Nouveau rendez-vous"
            </p>
          </div>
        ) : (
          <AppointmentList appointments={appointments} />
        )}

        {showNewAppointmentModal && (
          <NewAppointmentModal
            onClose={() => setShowNewAppointmentModal(false)}
            onSubmit={handleNewAppointment}
            services={services}
          />
        )}
      </div>
    </div>
  );
}