import React from 'react';
import { Upload, Search } from 'lucide-react';
import DocumentList from '../components/documents/DocumentList';
import DocumentCategories from '../components/documents/DocumentCategories';

export default function Documents() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Documents</h1>
            <p className="text-secondary-600">Gérez vos documents et fichiers</p>
          </div>

          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Upload className="w-4 h-4" />
            <span>Importer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <DocumentCategories />
          </div>
          <div className="lg:col-span-3">
            <DocumentList />
          </div>
        </div>
      </div>
    </div>
  );
}