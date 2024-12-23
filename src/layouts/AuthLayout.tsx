import React from 'react';
import { Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-primary-600" />
          <span className="text-2xl font-bold text-primary-600">Indeply</span>
        </div>
        <h2 className="mt-6 text-center text-sm text-secondary-600">
          Gestion d'activité pour indépendants
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}