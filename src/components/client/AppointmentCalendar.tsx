import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { Appointment } from '../../types';
import { formatTime } from '../../utils/date';

interface AppointmentCalendarProps {
  appointments: Appointment[];
}

export default function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
  const startDate = startOfWeek(new Date(), { locale: fr });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(apt => apt.date === format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div key={day.toString()} className="p-4 text-center border-r border-gray-200 last:border-r-0">
            <div className="text-sm font-medium text-secondary-900">
              {format(day, 'EEEE', { locale: fr })}
            </div>
            <div className="mt-1 text-lg font-semibold text-secondary-900">
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-200">
        {weekDays.map((day) => {
          const dayAppointments = getAppointmentsForDay(day);
          
          return dayAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="text-sm font-medium text-secondary-900">
                {formatTime(appointment.time)}
              </div>
              <div className="mt-1 text-sm text-secondary-600">
                {appointment.service}
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
}