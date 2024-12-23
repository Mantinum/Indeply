import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ClientSearchProps {
  onSearch: (searchTerm: string) => void;
}

export default function ClientSearch({ onSearch }: ClientSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value); // Recherche en temps réel
          }}
          placeholder="Rechercher un client par nom, email ou téléphone..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </form>
  );
}