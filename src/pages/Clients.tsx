import React, { useState } from 'react';
import { Search, UserPlus, Filter } from 'lucide-react';
import ClientList from '../components/clients/ClientList';
import ClientStats from '../components/clients/ClientStats';
import NewClientModal from '../components/clients/NewClientModal';
import { useClients } from '../hooks/useClients';

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const { clients, loading, error, loadClients } = useClients();

  const handleNewClientSuccess = async () => {
    setShowNewClientModal(false);
    await loadClients();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Clients</h1>
            <p className="text-secondary-600">Gérez votre base clients</p>
          </div>

          <button 
            onClick={() => setShowNewClientModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nouveau client</span>
          </button>
        </div>

        <ClientStats />

        <div className="mt-8 bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

          {error ? (
            <div className="p-4 text-red-700 bg-red-50 rounded-lg m-4">
              {error}
            </div>
          ) : (
            <ClientList clients={clients} searchTerm={searchTerm} />
          )}
        </div>

        {showNewClientModal && (
          <NewClientModal
            onClose={() => setShowNewClientModal(false)}
            onSuccess={handleNewClientSuccess}
          />
        )}
      </div>
    </div>
  );
}