import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  date: Date;
  slots: TimeSlot[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export default function TimeSlotPicker({ date, slots, selectedTime, onSelect }: TimeSlotPickerProps) {
  return (
    <div>
      <h3 className="font-medium text-secondary-900 mb-4">
        {format(date, 'EEEE d MMMM', { locale: fr })}
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {slots.map(({ time, available }) => (
          <button
            key={time}
            onClick={() => available && onSelect(time)}
            disabled={!available}
            className={`
              flex items-center justify-center gap-2 p-2 rounded-lg border
              ${available 
                ? selectedTime === time
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'border-gray-200 hover:border-primary-200 hover:bg-primary-50'
                : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}