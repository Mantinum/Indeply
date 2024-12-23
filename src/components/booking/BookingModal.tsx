import React, { useState } from 'react';
import { X, Calendar, Clock, Euro } from 'lucide-react';
import { ProfessionalProfile, ProfessionalLocation, Service } from '../../types';
import TimeSlotPicker from './TimeSlotPicker';

interface BookingModalProps {
  professional: ProfessionalProfile;
  location: ProfessionalLocation;
  services: Service[];
  onClose: () => void;
  onBook: (data: any) => void;
}

export default function BookingModal({ professional, location, services, onClose, onBook }: BookingModalProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBook = () => {
    if (!selectedService || !selectedTime) return;

    onBook({
      professionalId: professional.id,
      locationId: location.id,
      serviceId: selectedService.id,
      date: selectedDate,
      time: selectedTime
    });
  };

  // Exemple de créneaux disponibles
  const timeSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-900">
              Réserver un rendez-vous
            </h2>
            <button onClick={onClose} className="text-secondary-400 hover:text-secondary-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Sélection du service */}
          <div>
            <h3 className="font-medium text-secondary-900 mb-4">Choisissez un service</h3>
            <div className="space-y-2">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full p-4 rounded-lg border text-left ${
                    selectedService?.id === service.id
                      ? 'border-primary-200 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-secondary-900">{service.name}</h4>
                      <p className="text-sm text-secondary-600">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-secondary-900">{service.price} €</p>
                      <p className="text-sm text-secondary-600">{service.duration} min</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sélection de la date et de l'heure */}
          {selectedService && (
            <div>
              <h3 className="font-medium text-secondary-900 mb-4">Choisissez une date et un horaire</h3>
              <TimeSlotPicker
                date={selectedDate}
                slots={timeSlots}
                selectedTime={selectedTime}
                onSelect={setSelectedTime}
              />
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              {selectedService && (
                <p className="font-medium text-secondary-900">
                  Total : {selectedService.price} €
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleBook}
                disabled={!selectedService || !selectedTime}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmer la réservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}