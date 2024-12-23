import React from 'react';
import { Calendar, Users, Euro, Clock } from 'lucide-react';
import { appointments, clients } from '../data';
import AppointmentList from '../components/appointments/AppointmentList';
import StatsOverview from '../components/dashboard/StatsOverview';
import RevenueChart from '../components/dashboard/RevenueChart';

export default function Dashboard() {
  const todayAppointments = appointments.filter(apt => apt.date === '2024-03-21');
  
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Tableau de bord</h1>
          <p className="text-secondary-600">Bienvenue sur votre espace de gestion</p>
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          
          <div>
            <AppointmentList appointments={todayAppointments} />
          </div>
        </div>
      </div>
    </div>
  );
}