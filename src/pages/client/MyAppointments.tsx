import React, { useState } from 'react';
import { Calendar, List } from 'lucide-react';
import AppointmentList from '../../components/client/AppointmentList';
import AppointmentCalendar from '../../components/client/AppointmentCalendar';
import { useAppointments } from '../../hooks/useAppointments';

export default function MyAppointments() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const { appointments, loading, error } = useAppointments();

  if (loading) {
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
            <h1 className="text-2xl font-bold text-secondary-900">Mes rendez-vous</h1>
            <p className="text-secondary-600">Gérez vos rendez-vous à venir</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg ${
                view === 'list'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-secondary-400 hover:bg-gray-50'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`p-2 rounded-lg ${
                view === 'calendar'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-secondary-400 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border border-gray-200">
            <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Aucun rendez-vous</h3>
            <p className="text-secondary-600">
              Vous n'avez pas encore de rendez-vous programmé
            </p>
          </div>
        ) : view === 'list' ? (
          <AppointmentList appointments={appointments} />
        ) : (
          <AppointmentCalendar appointments={appointments} />
        )}
      </div>
    </div>
  );
}