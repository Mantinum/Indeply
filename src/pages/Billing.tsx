import React from 'react';
import { Euro, Download, Filter } from 'lucide-react';
import BillingStats from '../components/billing/BillingStats';
import InvoiceList from '../components/billing/InvoiceList';
import PaymentSummary from '../components/billing/PaymentSummary';

export default function Billing() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Facturation</h1>
            <p className="text-secondary-600">Gérez vos factures et paiements</p>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              <Euro className="w-4 h-4" />
              <span>Nouvelle facture</span>
            </button>
          </div>
        </div>

        <BillingStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <InvoiceList />
          </div>
          <div>
            <PaymentSummary />
          </div>
        </div>
      </div>
    </div>
  );
}