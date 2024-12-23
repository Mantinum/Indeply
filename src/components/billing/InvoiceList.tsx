import React from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

const invoices = [
  {
    id: 'INV-001',
    client: 'Marie Dubois',
    date: '2024-03-15',
    amount: 75,
    status: 'Payée'
  },
  {
    id: 'INV-002',
    client: 'Thomas Bernard',
    date: '2024-03-18',
    amount: 95,
    status: 'En attente'
  },
  {
    id: 'INV-003',
    client: 'Julie Petit',
    date: '2024-03-20',
    amount: 45,
    status: 'Payée'
  }
];

export default function InvoiceList() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher une facture..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filtrer</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Facture</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-secondary-900">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-secondary-600">{invoice.client}</td>
                <td className="px-6 py-4 text-sm text-secondary-600">
                  {format(new Date(invoice.date), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-secondary-900">{invoice.amount} €</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    invoice.status === 'Payée'
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-secondary-400 hover:text-secondary-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}