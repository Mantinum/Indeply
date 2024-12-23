import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ServiceList from '../components/services/ServiceList';
import ServiceCategories from '../components/services/ServiceCategories';
import NewServiceModal from '../components/services/NewServiceModal';
import { useProfessionalServices } from '../hooks/useProfessionalServices';

export default function Services() {
  const [showNewServiceModal, setShowNewServiceModal] = useState(false);
  const { services, loading, error, addService } = useProfessionalServices();

  const handleNewService = async (serviceData: any) => {
    try {
      await addService(serviceData);
      setShowNewServiceModal(false);
    } catch (err) {
      console.error('Erreur lors de la création du service:', err);
    }
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

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
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
            <h1 className="text-2xl font-bold text-secondary-900">Services</h1>
            <p className="text-secondary-600">Gérez vos prestations et tarifs</p>
          </div>

          <button
            onClick={() => setShowNewServiceModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau service</span>
          </button>
        </div>

        {services.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border border-gray-200">
            <Plus className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Aucun service</h3>
            <p className="text-secondary-600">
              Commencez par créer votre premier service en cliquant sur le bouton "Nouveau service"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ServiceCategories services={services} />
            </div>
            <div className="lg:col-span-3">
              <ServiceList services={services} />
            </div>
          </div>
        )}

        {showNewServiceModal && (
          <NewServiceModal
            onClose={() => setShowNewServiceModal(false)}
            onSubmit={handleNewService}
          />
        )}
      </div>
    </div>
  );
}