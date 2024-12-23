import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Appointment } from '../../types';
import { formatDateTime } from '../../utils/date';

interface AppointmentListProps {
  appointments: Appointment[];
}

export default function AppointmentList({ appointments }: AppointmentListProps) {
  const statusColors = {
    'Planifié': 'bg-primary-50 text-primary-700 border-primary-100',
    'En cours': 'bg-amber-50 text-amber-700 border-amber-100',
    'Terminé': 'bg-green-50 text-green-700 border-green-100',
    'Annulé': 'bg-red-50 text-red-700 border-red-100'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-secondary-900">{appointment.service}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm text-secondary-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDateTime(appointment.date, appointment.time)}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{appointment.duration} min</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[appointment.status]}`}>
                {appointment.status}
              </span>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-secondary-600">
                Prix: <span className="font-medium text-secondary-900">{appointment.price} €</span>
              </div>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Voir les détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}