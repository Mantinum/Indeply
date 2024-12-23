import React, { useState } from 'react';
import { Clock, Plus, Trash2, Calendar } from 'lucide-react';
import { fr } from 'date-fns/locale';

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

interface Break {
  day: string;
  startTime: string;
  endTime: string;
  type: 'break' | 'lunch';
}

interface Holiday {
  startDate: string;
  endDate: string;
  description: string;
}

interface AvailabilityManagerProps {
  onSave: (data: {
    slots: TimeSlot[];
    breaks: Break[];
    holidays: Holiday[];
  }) => void;
}

export default function AvailabilityManager({ onSave }: AvailabilityManagerProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [breaks, setBreaks] = useState<Break[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const addSlot = (day: string) => {
    setSlots([...slots, { day, startTime: '09:00', endTime: '17:00' }]);
  };

  const addBreak = (day: string) => {
    setBreaks([...breaks, { day, startTime: '12:00', endTime: '13:00', type: 'lunch' }]);
  };

  const addHoliday = () => {
    const today = new Date().toISOString().split('T')[0];
    setHolidays([...holidays, { startDate: today, endDate: today, description: '' }]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const removeBreak = (index: number) => {
    setBreaks(breaks.filter((_, i) => i !== index));
  };

  const removeHoliday = (index: number) => {
    setHolidays(holidays.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSave({ slots, breaks, holidays });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Horaires d'ouverture</h3>
        {days.map(day => (
          <div key={day} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-secondary-900">{day}</h4>
              <button
                onClick={() => addSlot(day)}
                className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
              >
                <Plus className="w-4 h-4" />
                Ajouter un créneau
              </button>
            </div>

            {slots
              .filter(slot => slot.day === day)
              .map((slot, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <Clock className="w-4 h-4 text-secondary-400" />
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => {
                      const newSlots = [...slots];
                      newSlots[index] = { ...slot, startTime: e.target.value };
                      setSlots(newSlots);
                    }}
                    className="px-3 py-1 rounded-lg border border-gray-200"
                  />
                  <span>à</span>
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => {
                      const newSlots = [...slots];
                      newSlots[index] = { ...slot, endTime: e.target.value };
                      setSlots(newSlots);
                    }}
                    className="px-3 py-1 rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => removeSlot(index)}
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

            <div className="mt-2">
              <button
                onClick={() => addBreak(day)}
                className="text-sm text-secondary-600 hover:text-secondary-700"
              >
                + Ajouter une pause
              </button>
            </div>

            {breaks
              .filter(brk => brk.day === day)
              .map((brk, index) => (
                <div key={index} className="flex items-center gap-4 mt-2 pl-8 text-sm text-secondary-600">
                  <select
                    value={brk.type}
                    onChange={(e) => {
                      const newBreaks = [...breaks];
                      newBreaks[index] = { ...brk, type: e.target.value as 'break' | 'lunch' };
                      setBreaks(newBreaks);
                    }}
                    className="px-2 py-1 rounded border border-gray-200"
                  >
                    <option value="break">Pause</option>
                    <option value="lunch">Déjeuner</option>
                  </select>
                  <input
                    type="time"
                    value={brk.startTime}
                    onChange={(e) => {
                      const newBreaks = [...breaks];
                      newBreaks[index] = { ...brk, startTime: e.target.value };
                      setBreaks(newBreaks);
                    }}
                    className="px-2 py-1 rounded border border-gray-200"
                  />
                  <span>à</span>
                  <input
                    type="time"
                    value={brk.endTime}
                    onChange={(e) => {
                      const newBreaks = [...breaks];
                      newBreaks[index] = { ...brk, endTime: e.target.value };
                      setBreaks(newBreaks);
                    }}
                    className="px-2 py-1 rounded border border-gray-200"
                  />
                  <button
                    onClick={() => removeBreak(index)}
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-secondary-900">Congés et fermetures</h3>
          <button
            onClick={addHoliday}
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          >
            <Plus className="w-4 h-4" />
            Ajouter une période
          </button>
        </div>

        {holidays.map((holiday, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <Calendar className="w-4 h-4 text-secondary-400" />
            <input
              type="date"
              value={holiday.startDate}
              onChange={(e) => {
                const newHolidays = [...holidays];
                newHolidays[index] = { ...holiday, startDate: e.target.value };
                setHolidays(newHolidays);
              }}
              className="px-3 py-1 rounded-lg border border-gray-200"
            />
            <span>au</span>
            <input
              type="date"
              value={holiday.endDate}
              onChange={(e) => {
                const newHolidays = [...holidays];
                newHolidays[index] = { ...holiday, endDate: e.target.value };
                setHolidays(newHolidays);
              }}
              className="px-3 py-1 rounded-lg border border-gray-200"
            />
            <input
              type="text"
              value={holiday.description}
              onChange={(e) => {
                const newHolidays = [...holidays];
                newHolidays[index] = { ...holiday, description: e.target.value };
                setHolidays(newHolidays);
              }}
              placeholder="Description"
              className="flex-1 px-3 py-1 rounded-lg border border-gray-200"
            />
            <button
              onClick={() => removeHoliday(index)}
              className="p-1 text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Enregistrer les disponibilités
        </button>
      </div>
    </div>
  );
}