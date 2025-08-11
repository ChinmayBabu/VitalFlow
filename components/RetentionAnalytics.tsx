import React from 'react';
import { Donor } from '../types';
import { TrendingDownIcon, UserCircleIcon } from './icons/Icons';

interface RetentionAnalyticsProps {
  donors: Donor[];
  onInitiateReachOut: (donor: Donor) => void;
}

const RetentionAnalytics: React.FC<RetentionAnalyticsProps> = ({ donors, onInitiateReachOut }) => {
  const atRiskDonors = donors.filter(d => d.dropoutRisk && d.dropoutRisk > 0.6).sort((a,b) => b.dropoutRisk! - a.dropoutRisk!);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <TrendingDownIcon className="h-6 w-6 mr-3 text-amber-500" />
        Donor Retention Analytics
      </h2>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {atRiskDonors.length > 0 ? (
          atRiskDonors.map(donor => (
            <div key={donor.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <UserCircleIcon className="h-10 w-10 text-gray-400 mr-4" />
                <div>
                  <p className="font-semibold text-gray-800">{donor.name}</p>
                  <p className="text-xs text-gray-500">Last Contact: {donor.lastContacted}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-bold text-amber-600 text-lg">{(donor.dropoutRisk! * 100).toFixed(0)}%</p>
                  <p className="text-xs text-gray-500">Dropout Risk</p>
                </div>
                <button 
                  onClick={() => onInitiateReachOut(donor)}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                >
                  Reach Out
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No donors currently at high risk.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetentionAnalytics;