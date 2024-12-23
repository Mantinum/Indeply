import React from 'react';
import { Calendar, Users, Euro, Clock } from 'lucide-react';
import { appointments, clients } from '../../data';
import { format } from 'date-fns';

export default function StatsOverview() {
  // Calcul des statistiques
  const today = format(new Date(), 'yyyy-MM-dd');
  const appointmentsToday = appointments.filter(apt => apt.date === today);
  const totalRevenue = appointments.reduce((sum, apt) => sum + apt.price, 0);
  const occupancyRate = Math.round((appointmentsToday.length / 8) * 100); // Supposons 8 créneaux par jour

  const stats = [
    {
      label: "Rendez-vous aujourd'hui",
      value: appointmentsToday.length,
      icon: Calendar,
      color: 'bg-primary-500',
      trend: `${appointmentsToday.length} confirmés`
    },
    {
      label: 'Clients actifs',
      value: clients.length,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+5 ce mois'
    },
    {
      label: 'Revenus du mois',
      value: `${totalRevenue} €`,
      icon: Euro,
      color: 'bg-green-500',
      trend: '+15% vs mois dernier'
    },
    {
      label: 'Taux de remplissage',
      value: `${occupancyRate}%`,
      icon: Clock,
      color: 'bg-amber-500',
      trend: '+5% cette semaine'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, trend }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-4">
            <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
              <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-secondary-600">{label}</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-semibold text-secondary-900">{value}</p>
                <span className="text-sm text-green-600">{trend}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}