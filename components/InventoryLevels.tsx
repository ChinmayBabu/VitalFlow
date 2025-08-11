import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { InventoryItem, BloodType } from '../types';

interface InventoryLevelsProps {
  inventory: InventoryItem[];
}

const getBarColor = (units: number, maxUnits: number) => {
  const percentage = (units / maxUnits) * 100;
  if (percentage < 25) return '#ef4444'; // red-500
  if (percentage < 60) return '#f59e0b'; // amber-500
  return '#22c55e'; // green-500
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white text-gray-700 p-3 rounded-lg border border-gray-200 shadow-lg">
                <p className="font-bold text-gray-900">{`Blood Type: ${label}`}</p>
                <p>{`Units: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const InventoryLevels: React.FC<InventoryLevelsProps> = ({ inventory }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={inventory} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <XAxis dataKey="bloodType" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} />
          <Bar dataKey="units" radius={[6, 6, 0, 0]}>
            {inventory.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.units, entry.maxUnits)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryLevels;