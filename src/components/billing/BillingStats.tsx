import React from 'react';
import { Euro, TrendingUp, CreditCard, Calendar } from 'lucide-react';

export default function BillingStats() {
  const stats = [
    {
      label: 'Chiffre du mois',
      value: '3 450 €',
      icon: Euro,
      trend: '+15% vs mois dernier'
    },
    {
      label: 'Factures en attente',
      value: '450 €',
      icon: Calendar,
      trend: '3 factures'
    },
    {
      label: 'Paiements reçus',
      value: '3 000 €',
      icon: CreditCard,
      trend: 'Ce mois'
    },
    {
      label: 'Taux de conversion',
      value: '98%',
      icon: TrendingUp,
      trend: '+2% ce mois'
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