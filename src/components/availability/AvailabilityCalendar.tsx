import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAvailabilityManagement } from '../../hooks/useAvailabilityManagement';

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i + 8;
  return hour < 20 ? `${hour.toString().padStart(2, '0')}:00` : null;
}).filter(Boolean) as string[];

export default function AvailabilityCalendar() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: fr }));
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>({});
  const { loading, error, updateAvailability, getAvailabilitiesForWeek } = useAvailabilityManagement();

  useEffect(() => {
    loadAvailabilities();
  }, [currentWeek]);

  const loadAvailabilities = async () => {
    const availabilities = await getAvailabilitiesForWeek(format(currentWeek, 'yyyy-MM-dd'));
    const slots: Record<string, string[]> = {};
    availabilities.forEach(availability => {
      slots[availability.date] = availability.slots;
    });
    setSelectedSlots(slots);
  };

  const handleSlotClick = (date: Date, time: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const currentSlots = selectedSlots[dateStr] || [];
    const newSlots = currentSlots.includes(time)
      ? currentSlots.filter(slot => slot !== time)
      : [...currentSlots, time].sort();

    setSelectedSlots(prev => ({
      ...prev,
      [dateStr]: newSlots
    }));

    updateAvailability(dateStr, newSlots);
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentWeek(prev => addDays(prev, -7))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="font-medium text-secondary-900">
              {format(currentWeek, 'MMMM yyyy', { locale: fr })}
            </h3>
            <button
              onClick={() => setCurrentWeek(prev => addDays(prev, 7))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-8 mt-4">
          <div className="border-r border-gray-200" />
          {weekDays.map(day => (
            <div key={day.toString()} className="text-center">
              <div className="text-xs text-secondary-500">
                {format(day, 'EEE', { locale: fr })}
              </div>
              <div className="text-sm font-medium">{format(day, 'd')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-auto max-h-[600px]">
        <div className="grid grid-cols-8">
          <div className="border-r border-gray-200">
            {timeSlots.map(time => (
              <div key={time} className="h-12 border-b border-gray-100 px-2 py-1">
                <div className="text-xs text-secondary-500">{time}</div>
              </div>
            ))}
          </div>

          {weekDays.map(day => (
            <div key={day.toString()} className="border-r border-gray-200 last:border-r-0">
              {timeSlots.map(time => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const isSelected = selectedSlots[dateStr]?.includes(time);

                return (
                  <button
                    key={`${dateStr}-${time}`}
                    onClick={() => handleSlotClick(day, time)}
                    className={`h-12 w-full border-b border-gray-100 ${
                      isSelected ? 'bg-primary-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    {isSelected && (
                      <Clock className="w-4 h-4 mx-auto text-primary-600" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}