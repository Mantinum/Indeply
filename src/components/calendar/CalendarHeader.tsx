import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, List } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarHeaderProps {
  currentDate: Date;
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  onDateChange: (date: Date) => void;
}

export default function CalendarHeader({ currentDate, view, onViewChange, onDateChange }: CalendarHeaderProps) {
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() - 1);
        break;
    }
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(currentDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() + 1);
        break;
    }
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, view === 'month' ? 'MMMM yyyy' : 'dd MMMM yyyy', { locale: fr })}
        </h2>
        <button
          onClick={handleNext}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewChange('day')}
          className={`p-2 rounded-lg ${
            view === 'day' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100'
          }`}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewChange('week')}
          className={`p-2 rounded-lg ${
            view === 'week' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewChange('month')}
          className={`p-2 rounded-lg ${
            view === 'month' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}