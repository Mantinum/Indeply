import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Appointment } from '../../types';
import { formatTime } from '../../utils/date';

interface CalendarViewProps {
  appointments: Appointment[];
  onDateSelect: (date: Date) => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

export default function CalendarView({ appointments, onDateSelect, onAppointmentClick }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: fr }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 8;
    return hour < 20 ? `${hour}:00` : null;
  }).filter(Boolean);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const getAppointmentsForDateAndTime = (date: Date, time: string) => {
    return appointments.filter(apt => 
      isSameDay(new Date(apt.date), date) && apt.time === time
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="font-medium text-secondary-900">
              {format(currentWeek, 'MMMM yyyy', { locale: fr })}
            </h3>
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-8 mt-4">
          <div className="border-r border-gray-200" />
          {weekDays.map(day => (
            <div
              key={day.toString()}
              className="text-center"
            >
              <button
                onClick={() => handleDateSelect(day)}
                className={`w-10 h-10 rounded-full ${
                  isSameDay(selectedDate, day)
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="text-xs">{format(day, 'EEE', { locale: fr })}</div>
                <div className="text-sm font-medium">{format(day, 'd')}</div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-auto" style={{ height: 'calc(100vh - 300px)' }}>
        <div className="grid grid-cols-8">
          <div className="border-r border-gray-200">
            {timeSlots.map(time => (
              <div key={time} className="h-20 border-b border-gray-100 px-2 py-1">
                <div className="text-xs text-secondary-500">{time}</div>
              </div>
            ))}
          </div>

          {weekDays.map(day => (
            <div key={day.toString()} className="border-r border-gray-200 last:border-r-0">
              {timeSlots.map(time => {
                const dayAppointments = getAppointmentsForDateAndTime(day, time!);
                return (
                  <div key={time} className="h-20 border-b border-gray-100 relative">
                    {dayAppointments.map(appointment => (
                      <button
                        key={appointment.id}
                        onClick={() => onAppointmentClick(appointment)}
                        className="absolute inset-x-1 bg-primary-100 text-primary-700 rounded p-1 text-xs"
                        style={{
                          top: '4px',
                          height: `${(appointment.duration / 60) * 5}rem`
                        }}
                      >
                        <div className="font-medium">{appointment.clientName}</div>
                        <div>{appointment.service}</div>
                        <div>{formatTime(appointment.time)} - {appointment.duration}min</div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}