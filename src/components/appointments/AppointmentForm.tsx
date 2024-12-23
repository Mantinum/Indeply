import React, { useState } from 'react';
import { Clock, Calendar, User, FileText } from 'lucide-react';
import { Client, Service } from '../../types';
import { clients, services } from '../../data';

interface AppointmentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function AppointmentForm({ onSubmit, onCancel }: AppointmentFormProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !selectedService || !date || !time) return;

    onSubmit({
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      service: selectedService.name,
      date,
      time,
      duration: selectedService.duration,
      price: selectedService.price,
      notes,
      status: 'Planifié'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          <User className="w-4 h-4 inline-block mr-2" />
          Client
        </label>
        <select
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedClient?.id || ''}
          onChange={(e) => setSelectedClient(clients.find(c => c.id === e.target.value) || null)}
        >
          <option value="">Sélectionner un client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          <Clock className="w-4 h-4 inline-block mr-2" />
          Service
        </label>
        <select
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedService?.id || ''}
          onChange={(e) => setSelectedService(services.find(s => s.id === e.target.value) || null)}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <Clock className="w-4 h-4 inline-block mr-2" />
            Heure
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          <FileText className="w-4 h-4 inline-block mr-2" />
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
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
  );
}