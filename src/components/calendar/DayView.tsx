import React from 'react';
import { format, addMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '../../types';
import { getAppointmentDuration } from '../../utils/appointment';

interface DayViewProps {
  date: Date;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  availableSlots?: { start: string; end: string }[];
}

export default function DayView({ date, appointments, onAppointmentClick, availableSlots }: DayViewProps) {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 8;
    return hour < 20 ? `${hour}:00` : null;
  }).filter(Boolean);

  const getAppointmentStyle = (appointment: Appointment) => {
    const startMinutes = parseInt(appointment.time.split(':')[0]) * 60 + 
                        parseInt(appointment.time.split(':')[1]);
    const height = (appointment.duration / 60) * 5; // 5rem par heure
    return {
      top: `${(startMinutes - 480) / 12}rem`, // 480 = 8h00 en minutes
      height: `${height}rem`
    };
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-center py-4 border-b border-gray-200">
        <h3 className="font-medium text-secondary-900">
          {format(date, 'EEEE d MMMM', { locale: fr })}
        </h3>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-16 flex-shrink-0 border-r border-gray-200">
          {timeSlots.map(time => (
            <div key={time} className="h-20 border-b border-gray-100 px-2 py-1">
              <div className="text-xs text-secondary-500">{time}</div>
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          {appointments.map(appointment => (
            <button
              key={appointment.id}
              onClick={() => onAppointmentClick(appointment)}
              className="absolute inset-x-1 bg-primary-100 text-primary-700 rounded p-2 text-sm hover:bg-primary-200 transition-colors"
              style={getAppointmentStyle(appointment)}
            >
              <div className="font-medium">{appointment.clientName}</div>
              <div>{appointment.service}</div>
              <div>{format(new Date(`2000-01-01T${appointment.time}`), 'HH:mm')} - {getAppointmentDuration(appointment)}</div>
            </button>
          ))}

          {availableSlots?.map((slot, index) => (
            <div
              key={index}
              className="absolute inset-x-1 bg-green-50 border border-green-100 rounded opacity-50"
              style={{
                top: `${(parseInt(slot.start.split(':')[0]) * 60 + parseInt(slot.start.split(':')[1]) - 480) / 12}rem`,
                height: `${((parseInt(slot.end.split(':')[0]) * 60 + parseInt(slot.end.split(':')[1])) - 
                         (parseInt(slot.start.split(':')[0]) * 60 + parseInt(slot.start.split(':')[1]))) / 12}rem`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}