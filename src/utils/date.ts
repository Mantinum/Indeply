import { format, parseISO, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date: string): string => {
  const parsedDate = parseISO(date);
  if (isToday(parsedDate)) {
    return "Aujourd'hui";
  }
  if (isTomorrow(parsedDate)) {
    return 'Demain';
  }
  if (isThisWeek(parsedDate)) {
    return format(parsedDate, 'EEEE', { locale: fr });
  }
  return format(parsedDate, 'dd/MM/yyyy');
};

export const formatTime = (time: string): string => {
  return time.replace(':', 'h');
};

export const formatDateTime = (date: string, time: string): string => {
  return `${formatDate(date)} à ${formatTime(time)}`;
};