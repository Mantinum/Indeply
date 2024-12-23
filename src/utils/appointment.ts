import { Appointment } from '../types';

export const getAppointmentDuration = (appointment: Appointment): string => {
  if (appointment.duration < 60) {
    return `${appointment.duration} min`;
  }
  const hours = Math.floor(appointment.duration / 60);
  const minutes = appointment.duration % 60;
  return minutes > 0 ? `${hours}h${minutes}` : `${hours}h`;
};

export const getAppointmentStatus = (status: Appointment['status']): {
  color: string;
  bgColor: string;
  borderColor: string;
} => {
  switch (status) {
    case 'Planifié':
      return {
        color: 'text-primary-700',
        bgColor: 'bg-primary-50',
        borderColor: 'border-primary-100'
      };
    case 'En cours':
      return {
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100'
      };
    case 'Terminé':
      return {
        color: 'text-green-700',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-100'
      };
    case 'Annulé':
      return {
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-100'
      };
    default:
      return {
        color: 'text-gray-700',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-100'
      };
  }
};