import React from 'react';
import { Folder } from 'lucide-react';

export default function ServiceCategories() {
  const categories = [
    { name: 'Visage', count: 5 },
    { name: 'Massage', count: 3 },
    { name: 'Mains', count: 4 },
    { name: 'Pieds', count: 2 },
    { name: 'Corps', count: 6 }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="font-semibold text-secondary-900 mb-4">Catégories</h2>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category.name}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 text-left"
          >
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-secondary-400" />
              <span className="text-secondary-900">{category.name}</span>
            </div>
            <span className="text-sm text-secondary-500">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}