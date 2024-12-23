import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  availableSlots: string[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export default function BookingCalendar({
  selectedDate,
  onDateChange,
  availableSlots,
  selectedTime,
  onTimeSelect
}: BookingCalendarProps) {
  const weekStart = startOfWeek(selectedDate, { locale: fr });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onDateChange(addDays(selectedDate, -7))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-medium text-secondary-900">
            {format(selectedDate, 'MMMM yyyy', { locale: fr })}
          </h3>
          <button
            onClick={() => onDateChange(addDays(selectedDate, 7))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mt-4">
          {weekDays.map(day => (
            <button
              key={day.toString()}
              onClick={() => onDateChange(day)}
              className={`p-2 rounded-lg text-center ${
                format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  ? 'bg-primary-50 text-primary-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="text-xs text-secondary-500">
                {format(day, 'EEE', { locale: fr })}
              </div>
              <div className="text-sm font-medium">
                {format(day, 'd')}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-medium text-secondary-900 mb-4">Horaires disponibles</h4>
        <div className="grid grid-cols-3 gap-2">
          {availableSlots.map(time => (
            <button
              key={time}
              onClick={() => onTimeSelect(time)}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                selectedTime === time
                  ? 'border-primary-200 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-primary-200 hover:bg-primary-50'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}