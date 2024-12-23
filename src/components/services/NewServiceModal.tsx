import React, { useState } from 'react';
import { X, Clock, Euro, Tag } from 'lucide-react';

interface NewServiceModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function NewServiceModal({ onClose, onSubmit }: NewServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-900">
              Nouveau service
            </h2>
            <button onClick={onClose} className="text-secondary-400 hover:text-secondary-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Visage">Visage</option>
                <option value="Corps">Corps</option>
                <option value="Massage">Massage</option>
                <option value="Mains">Mains</option>
                <option value="Pieds">Pieds</option>
              </select>
            </div>
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
              Créer le service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}