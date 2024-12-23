import React, { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

interface AvailabilityManagerProps {
  onSave: (slots: TimeSlot[]) => void;
}

export default function AvailabilityManager({ onSave }: AvailabilityManagerProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const addSlot = (day: string) => {
    setSlots([...slots, { day, startTime: '09:00', endTime: '17:00' }]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const updateSlot = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setSlots(newSlots);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-secondary-900">Gérer vos disponibilités</h3>

      {days.map(day => (
        <div key={day} className="border-b border-gray-200 pb-4 last:border-0">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-secondary-900">{day}</h4>
            <button
              onClick={() => addSlot(day)}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm text-primary-600 hover:text-primary-700"
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
                  onChange={(e) => updateSlot(index, 'startTime', e.target.value)}
                  className="px-3 py-1 rounded-lg border border-gray-200"
                />
                <span>à</span>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => updateSlot(index, 'endTime', e.target.value)}
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
        </div>
      ))}

      <button
        onClick={() => onSave(slots)}
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Enregistrer les disponibilités
      </button>
    </div>
  );
}