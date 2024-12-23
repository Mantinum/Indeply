import React from 'react';
import { Users, UserPlus, History, Star } from 'lucide-react';

export default function ClientStats() {
  const stats = [
    {
      label: 'Total clients',
      value: '124',
      icon: Users,
      trend: '+12% ce mois'
    },
    {
      label: 'Nouveaux clients',
      value: '8',
      icon: UserPlus,
      trend: 'Ce mois'
    },
    {
      label: 'Clients fidèles',
      value: '45',
      icon: Star,
      trend: '3+ visites'
    },
    {
      label: 'Taux de retour',
      value: '78%',
      icon: History,
      trend: '+5% vs mois dernier'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, trend }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Icon className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-secondary-600">{label}</span>
          </div>
          <p className="text-2xl font-semibold text-secondary-900">{value}</p>
          <p className="text-sm text-secondary-500 mt-1">{trend}</p>
        </div>
      ))}
    </div>
  );
}