import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '1 Mars', revenue: 1200 },
  { date: '8 Mars', revenue: 1800 },
  { date: '15 Mars', revenue: 1500 },
  { date: '22 Mars', revenue: 2200 },
  { date: '29 Mars', revenue: 1900 }
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-secondary-900">Revenus</h3>
          <p className="text-sm text-secondary-500">Évolution mensuelle</p>
        </div>
        <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <option value="30">30 derniers jours</option>
          <option value="60">60 derniers jours</option>
          <option value="90">90 derniers jours</option>
        </select>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#d946ef"
              strokeWidth={2}
              dot={{ fill: '#d946ef' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}