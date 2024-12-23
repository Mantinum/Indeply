import React from 'react';
import { Clock, Euro, MoreVertical } from 'lucide-react';
import { Service } from '../../types';

interface ServiceListProps {
  services: Service[];
}

export default function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="grid gap-4 p-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-secondary-900">{service.name}</h3>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                  {service.category}
                </span>
              </div>
              <p className="mt-1 text-sm text-secondary-600">{service.description}</p>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-secondary-600">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-secondary-900">
                  <Euro className="w-4 h-4" />
                  <span>{service.price} €</span>
                </div>
              </div>
            </div>
            <button className="ml-4 text-secondary-400 hover:text-secondary-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}