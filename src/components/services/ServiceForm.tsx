import React, { useState } from 'react';
import { useServices } from '../../hooks/useServices';
import { Clock, Euro, Tag } from 'lucide-react';

interface ServiceFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ServiceForm({ onSuccess, onCancel }: ServiceFormProps) {
  const { loading, error, addService } = useServices();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addService(formData);
      onSuccess();
    } catch (err) {
      // L'erreur est déjà gérée par le hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Nom du service
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <Clock className="w-4 h-4 inline-block mr-2" />
            Durée (min)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
            min="15"
            step="15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <Euro className="w-4 h-4 inline-block mr-2" />
            Prix (€)
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <Tag className="w-4 h-4 inline-block mr-2" />
            Catégorie
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
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
          disabled={loading}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Création...' : 'Créer le service'}
        </button>
      </div>
    </form>
  );
}