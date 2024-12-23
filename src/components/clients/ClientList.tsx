import React from 'react';
import { Calendar, Phone, Mail, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

interface ClientListProps {
  clients: any[];
  searchTerm: string;
}

export default function ClientList({ clients, searchTerm }: ClientListProps) {
  const filteredClients = clients.filter(client => {
    const searchLower = searchTerm.toLowerCase();
    const fullName = `${client.first_name || ''} ${client.last_name || ''}`.toLowerCase();
    const email = (client.email || '').toLowerCase();
    const phone = client.phone || '';

    return fullName.includes(searchLower) ||
           email.includes(searchLower) ||
           phone.includes(searchLower);
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'inscription</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredClients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium">
                      {client.first_name?.[0]}{client.last_name?.[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-secondary-900">
                      {client.first_name} {client.last_name}
                    </div>
                    <div className="text-sm text-secondary-500">Client #{client.id.slice(0, 8)}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  {client.phone && (
                    <div className="flex items-center gap-2 text-sm text-secondary-600">
                      <Phone className="w-4 h-4" />
                      {client.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <Mail className="w-4 h-4" />
                    {client.email}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-secondary-600">
                {format(new Date(client.created_at), 'dd/MM/yyyy')}
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

      {filteredClients.length === 0 && (
        <div className="text-center py-8 text-secondary-600">
          Aucun client trouvé
        </div>
      )}
    </div>
  );
}