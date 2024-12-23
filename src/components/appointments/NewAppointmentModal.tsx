import React, { useState } from 'react';
import { X, Calendar, Clock, User, FileText, Plus } from 'lucide-react';
import { Client } from '../../types';
import { useClients } from '../../hooks/useClients';
import NewClientModal from '../clients/NewClientModal';

interface NewAppointmentModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  services: any[];
}

export default function NewAppointmentModal({ onClose, onSubmit, services }: NewAppointmentModalProps) {
  const { clients, loading: clientsLoading, error: clientsError } = useClients();
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    serviceId: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientId || !formData.serviceId) {
      alert('Veuillez sélectionner un client et un service');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error('Erreur lors de la création du rendez-vous:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-900">
              Nouveau rendez-vous
            </h2>
            <button onClick={onClose} className="text-secondary-400 hover:text-secondary-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-secondary-700">
                <User className="w-4 h-4 inline-block mr-2" />
                Client
              </label>
              <button
                type="button"
                onClick={() => setShowNewClientModal(true)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                <Plus className="w-4 h-4 inline-block mr-1" />
                Nouveau client
              </button>
            </div>
            <select
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Sélectionner un client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Clock className="w-4 h-4 inline-block mr-2" />
              Service
            </label>
            <select
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Sélectionner un service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - {service.duration}min - {service.price}€
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                <Calendar className="w-4 h-4 inline-block mr-2" />
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                <Clock className="w-4 h-4 inline-block mr-2" />
                Heure
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <FileText className="w-4 h-4 inline-block mr-2" />
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Créer le rendez-vous
            </button>
          </div>
        </form>
      </div>

      {showNewClientModal && (
        <NewClientModal
          onClose={() => setShowNewClientModal(false)}
          onSuccess={() => {
            setShowNewClientModal(false);
          }}
        />
      )}
    </div>
  );
}