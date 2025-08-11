import React, { useState } from 'react';
import { BloodRequest, BloodType, BloodRequestStatus } from '../types';
import { mockHospitals } from '../constants';
import { MapPinIcon, BeakerIcon, UsersIcon, EllipsisVerticalIcon } from './icons/Icons';

interface EmergencyRequestCardProps {
  request: BloodRequest;
  onFindDonors: (request: BloodRequest) => void;
  onShowDetails: (request: BloodRequest) => void;
  onUpdateRequestStatus: (requestId: string, status: BloodRequestStatus) => void;
  isSelected: boolean;
}

const getUrgencyStyles = (urgency: 'Critical' | 'High' | 'Medium') => {
  switch (urgency) {
    case 'Critical': return { bg: 'bg-red-50', text: 'text-red-700' };
    case 'High': return { bg: 'bg-amber-50', text: 'text-amber-700' };
    default: return { bg: 'bg-blue-50', text: 'text-blue-700' };
  }
};

const getStatusPillColor = (status: BloodRequestStatus) => {
    switch (status) {
        case 'Open': return 'bg-green-100 text-green-800';
        case 'In Progress': return 'bg-yellow-100 text-yellow-800';
        case 'Fulfilled': return 'bg-gray-200 text-gray-600';
    }
}

const EmergencyRequestCard: React.FC<EmergencyRequestCardProps> = ({ request, onFindDonors, onShowDetails, onUpdateRequestStatus, isSelected }) => {
  const hospital = mockHospitals.find(h => h.id === request.hospitalId);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const urgencyStyles = getUrgencyStyles(request.urgency);
  
  const handleStatusUpdate = (status: BloodRequestStatus) => {
    onUpdateRequestStatus(request.id, status);
    setMenuOpen(false);
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border flex flex-col justify-between transition-all duration-300 ease-in-out ${isSelected ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-gray-200 hover:shadow-lg hover:-translate-y-1'}`}>
      <div>
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1.5" />
                  {hospital?.name}
                </p>
                <h3 className="text-xl font-bold text-gray-800 mt-1">Request for {request.units} units</h3>
            </div>
            <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl bg-red-100 text-red-600 text-3xl font-black shadow-inner-sm`}>
                {request.bloodType}
            </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
             <div className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${urgencyStyles.bg} ${urgencyStyles.text}`}>
                {request.urgency} Urgency
            </div>
            <div className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusPillColor(request.status)}`}>
                Status: {request.status}
            </div>
        </div>
      </div>
      
      <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <button 
              onClick={() => onFindDonors(request)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transform"
              aria-label={`Find donors for ${request.bloodType} request at ${hospital?.name}`}
              >
              <UsersIcon className="h-4 w-4 mr-2" />
              Find Donors
            </button>
            <button 
              onClick={() => onShowDetails(request)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
              aria-label={`Show details for ${request.bloodType} request at ${hospital?.name}`}
              >
              Details
            </button>
        </div>

        <div className="relative">
            <button onClick={() => setMenuOpen(!isMenuOpen)} onBlur={() => setTimeout(() => setMenuOpen(false), 150)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10 animate-fade-in-up">
                    <div className="py-2">
                        <p className="px-4 py-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider">Update Status</p>
                        <button onClick={() => handleStatusUpdate('Open')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Open</button>
                        <button onClick={() => handleStatusUpdate('In Progress')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">In Progress</button>
                        <button onClick={() => handleStatusUpdate('Fulfilled')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fulfilled</button>
                    </div>
                </div>
            )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(5px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.1s ease-out;
        }
        .shadow-inner-sm {
            box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
      `}</style>
    </div>
  );
};

export default EmergencyRequestCard;