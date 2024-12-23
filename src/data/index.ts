import { Client, Appointment, Service, Professional } from '../types';

export const professional: Professional = {
  id: '1',
  name: 'Sophie Martin',
  profession: 'Esthéticienne',
  speciality: 'Soins du visage',
  email: 'sophie.martin@indeply.com',
  phone: '06 12 34 56 78',
  address: '15 rue des Fleurs, 75001 Paris',
  image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=150&h=150'
};

export const clients: Client[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '06 23 45 67 89',
    lastVisit: '2024-03-10',
    nextAppointment: '2024-03-25',
    notes: 'Préfère les rendez-vous en matinée',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@email.com',
    phone: '06 34 56 78 90',
    lastVisit: '2024-03-15',
    nextAppointment: '2024-03-28',
    notes: 'Allergique aux huiles essentielles',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const appointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Marie Dubois',
    service: 'Soin du visage',
    date: '2024-03-21',
    time: '09:00',
    duration: 60,
    status: 'Planifié',
    price: 75,
    notes: 'Premier rendez-vous'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Thomas Bernard',
    service: 'Massage relaxant',
    date: '2024-03-21',
    time: '10:30',
    duration: 90,
    status: 'En cours',
    price: 95,
    notes: 'Tension au niveau des épaules'
  }
];

export const services: Service[] = [
  {
    id: '1',
    name: 'Soin du visage',
    description: 'Soin complet avec nettoyage, gommage et masque',
    duration: 60,
    price: 75,
    category: 'Visage'
  },
  {
    id: '2',
    name: 'Massage relaxant',
    description: 'Massage complet du corps aux huiles essentielles',
    duration: 90,
    price: 95,
    category: 'Massage'
  }
];