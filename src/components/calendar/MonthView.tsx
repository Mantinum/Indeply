import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '../../types';

interface MonthViewProps {
  date: Date;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
}

export default function MonthView({ date, appointments, onAppointmentClick }: MonthViewProps) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(apt => apt.date === format(day, 'yyyy-MM-dd'));
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
        <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-secondary-600">
          {day}
        </div>
      ))}

      {days.map(day => {
        const dayAppointments = getAppointmentsForDay(day);
        const isCurrentMonth = isSameMonth(day, date);
        const isCurrentDay = isToday(day);

        return (
          <div
            key={day.toString()}
            className={`min-h-[120px] bg-white p-2 ${
              !isCurrentMonth ? 'bg-gray-50' : ''
            }`}
          >
            <div className={`text-sm font-medium mb-1 ${
              isCurrentDay
                ? 'text-primary-600'
                : isCurrentMonth
                ? 'text-secondary-900'
                : 'text-secondary-400'
            }`}>
              {format(day, 'd')}
            </div>

            <div className="space-y-1">
              {dayAppointments.slice(0, 3).map(appointment => (
                <button
                  key={appointment.id}
                  onClick={() => onAppointmentClick(appointment)}
                  className="w-full text-left px-2 py-1 text-xs rounded bg-primary-50 text-primary-700 hover:bg-primary-100"
                >
                  <div className="font-medium truncate">
                    {format(new Date(`2000-01-01T${appointment.time}`), 'HH:mm')} - {appointment.clientName}
                  </div>
                </button>
              ))}
              {dayAppointments.length > 3 && (
                <div className="text-xs text-secondary-500 px-2">
                  +{dayAppointments.length - 3} autres
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}