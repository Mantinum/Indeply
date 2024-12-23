import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '../../types';
import { getAppointmentDuration } from '../../utils/appointment';

interface WeekViewProps {
  date: Date;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  availableSlots?: { day: number; start: string; end: string }[];
}

export default function WeekView({ date, appointments, onAppointmentClick, availableSlots }: WeekViewProps) {
  const weekStart = startOfWeek(date, { locale: fr });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
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
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-4 border-r border-gray-200" />
        {weekDays.map(day => (
          <div key={day.toString()} className="p-4 text-center border-r border-gray-200 last:border-r-0">
            <div className="text-sm font-medium text-secondary-900">
              {format(day, 'EEEE', { locale: fr })}
            </div>
            <div className="text-lg font-semibold text-secondary-900">
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8">
          <div className="border-r border-gray-200">
            {timeSlots.map(time => (
              <div key={time} className="h-20 border-b border-gray-100 px-2 py-1">
                <div className="text-xs text-secondary-500">{time}</div>
              </div>
            ))}
          </div>

          {weekDays.map(day => (
            <div key={day.toString()} className="relative border-r border-gray-200 last:border-r-0">
              {appointments
                .filter(apt => apt.date === format(day, 'yyyy-MM-dd'))
                .map(appointment => (
                  <button
                    key={appointment.id}
                    onClick={() => onAppointmentClick(appointment)}
                    className="absolute inset-x-1 bg-primary-100 text-primary-700 rounded p-1 text-xs hover:bg-primary-200 transition-colors"
                    style={getAppointmentStyle(appointment)}
                  >
                    <div className="font-medium truncate">{appointment.clientName}</div>
                    <div className="truncate">{appointment.service}</div>
                    <div>{format(new Date(`2000-01-01T${appointment.time}`), 'HH:mm')}</div>
                  </button>
                ))}

              {availableSlots
                ?.filter(slot => slot.day === day.getDay())
                .map((slot, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}