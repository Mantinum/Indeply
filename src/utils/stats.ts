import { Appointment, Client } from '../types';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export const calculateDailyStats = (appointments: Appointment[]) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const appointmentsToday = appointments.filter(apt => apt.date === today);
  
  return {
    count: appointmentsToday.length,
    revenue: appointmentsToday.reduce((sum, apt) => sum + apt.price, 0),
    completed: appointmentsToday.filter(apt => apt.status === 'Terminé').length,
    pending: appointmentsToday.filter(apt => apt.status === 'Planifié').length
  };
};

export const calculateMonthlyStats = (appointments: Appointment[]) => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const monthlyAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return isWithinInterval(aptDate, { start: monthStart, end: monthEnd });
  });

  return {
    count: monthlyAppointments.length,
    revenue: monthlyAppointments.reduce((sum, apt) => sum + apt.price, 0),
    averagePerDay: Math.round(monthlyAppointments.length / 30)
  };
};

export const calculateClientStats = (clients: Client[], appointments: Appointment[]) => {
  const activeClients = clients.filter(client => {
    const clientAppointments = appointments.filter(apt => apt.clientId === client.id);
    return clientAppointments.length > 0;
  });

  return {
    total: clients.length,
    active: activeClients.length,
    newThisMonth: 2, // À implémenter avec la date de création du client
    returnRate: Math.round((activeClients.length / clients.length) * 100)
  };
};