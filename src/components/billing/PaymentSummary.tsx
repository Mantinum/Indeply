import React from 'react';
import { CreditCard, Calendar } from 'lucide-react';

export default function PaymentSummary() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="font-semibold text-secondary-900 mb-4">Résumé des paiements</h2>
      
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-secondary-600">Ce mois</span>
            <Calendar className="w-4 h-4 text-secondary-400" />
          </div>
          <p className="text-2xl font-semibold text-secondary-900">3 450 €</p>
          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-secondary-600">Payé</p>
              <p className="font-medium text-secondary-900">3 000 €</p>
            </div>
            <div>
              <p className="text-secondary-600">En attente</p>
              <p className="font-medium text-secondary-900">450 €</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-secondary-900 mb-2">Moyens de paiement acceptés</h3>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-secondary-400" />
            <span className="text-sm text-secondary-600">Carte bancaire, espèces</span>
          </div>
        </div>
      </div>
    </div>
  );
}