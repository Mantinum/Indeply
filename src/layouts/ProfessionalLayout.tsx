import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import Appointments from '../pages/Appointments';
import Clients from '../pages/Clients';
import Services from '../pages/Services';
import Billing from '../pages/Billing';
import Documents from '../pages/Documents';
import Settings from '../pages/Settings';

interface ProfessionalLayoutProps {
  onLogout: () => void;
}

export default function ProfessionalLayout({ onLogout }: ProfessionalLayoutProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'clients':
        return <Clients />;
      case 'services':
        return <Services />;
      case 'billing':
        return <Billing />;
      case 'documents':
        return <Documents />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} onLogout={onLogout} />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}