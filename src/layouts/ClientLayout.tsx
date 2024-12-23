import React from 'react';
import { Search, Calendar, User, MapPin, Heart, Settings, LogOut } from 'lucide-react';
import ProfessionalSearch from '../components/client/ProfessionalSearch';
import SearchResults from '../components/client/SearchResults';

interface ClientLayoutProps {
  onLogout: () => void;
}

export default function ClientLayout({ onLogout }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-primary-600">Indeply</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a className="border-primary-500 text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </a>
                <a className="border-transparent text-secondary-500 hover:border-secondary-300 hover:text-secondary-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  Mes rendez-vous
                </a>
                <a className="border-transparent text-secondary-500 hover:border-secondary-300 hover:text-secondary-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoris
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-lg text-secondary-500 hover:text-secondary-600">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={onLogout}
                className="ml-4 p-2 rounded-lg text-secondary-500 hover:text-secondary-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-secondary-900">
              Trouvez un professionnel près de chez vous
            </h1>
            <p className="text-secondary-600">
              Recherchez par profession, lieu ou service
            </p>
          </div>

          <ProfessionalSearch onSearch={() => {}} />
          
          {/* Résultats de recherche à implémenter */}
        </div>
      </main>
    </div>
  );
}