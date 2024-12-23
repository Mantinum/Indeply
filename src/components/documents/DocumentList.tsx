import React from 'react';
import { FileText, Download, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

const documents = [
  {
    id: '1',
    name: 'Facture Mars 2024.pdf',
    type: 'PDF',
    size: '156 KB',
    date: '2024-03-15',
    category: 'Factures'
  },
  {
    id: '2',
    name: 'Contrat type.docx',
    type: 'DOCX',
    size: '245 KB',
    date: '2024-03-10',
    category: 'Contrats'
  },
  {
    id: '3',
    name: 'Planning Avril.xlsx',
    type: 'XLSX',
    size: '178 KB',
    date: '2024-03-20',
    category: 'Planning'
  }
];

export default function DocumentList() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="grid gap-4 p-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary-50 rounded-lg">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-secondary-900">{doc.name}</h3>
                <p className="text-sm text-secondary-500">
                  {doc.type} • {doc.size} • {format(new Date(doc.date), 'dd/MM/yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-secondary-400">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-secondary-400">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}