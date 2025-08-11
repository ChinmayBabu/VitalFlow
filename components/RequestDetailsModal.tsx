import React, { useMemo } from 'react';
import { BloodRequest, Donor, Notification } from '../types';
import { mockHospitals, mockDonors, SEARCH_RADIUS } from '../constants';
import { XMarkIcon, BeakerIcon, MapPinIcon, UserCircleIcon, UsersIcon } from './icons/Icons';

interface RequestDetailsModalProps {
  request: BloodRequest;
  onClose: () => void;
  addNotification: (message: string, type: Notification['type']) => void;
}

const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({ request, onClose, addNotification }) => {
  const hospital = useMemo(() => mockHospitals.find(h => h.id === request.hospitalId), [request.hospitalId]);

  const eligibleDonors = useMemo(() => {
    if (!hospital) return [];
    return mockDonors.filter(donor => {
      if (donor.bloodType !== request.bloodType) return false;
      const distance = Math.sqrt(
        Math.pow(hospital.location.lat - donor.location.lat, 2) +
        Math.pow(hospital.location.lng - donor.location.lng, 2)
      );
      return distance <= SEARCH_RADIUS;
    });
  }, [request.bloodType, hospital]);

  const handleNotifyAll = () => {
    addNotification(`Simulated alerts sent to ${eligibleDonors.length} eligible donors.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200 flex flex-col max-h-[90vh] animate-slide-up">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-2xl font-bold text-gray-900">Request Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 bg-gray-50">
          {/* Request Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="text-lg font-semibold text-blue-700 mb-4">{hospital?.name}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Blood Type</p>
                <p className="text-gray-900 font-bold text-2xl">{request.bloodType}</p>
              </div>
              <div>
                <p className="text-gray-500">Units Needed</p>
                <p className="text-gray-900 font-bold text-2xl">{request.units}</p>
              </div>
              <div>
                <p className="text-gray-500">Urgency</p>
                <p className={`font-bold text-2xl ${request.urgency === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>{request.urgency}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="text-gray-900 font-bold text-2xl">{request.status}</p>
              </div>
            </div>
             <p className="text-xs text-gray-400 mt-4">
              Request Time: {new Date(request.timestamp).toLocaleString()}
            </p>
          </div>

          {/* Eligible Donors List */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Eligible Donors ({eligibleDonors.length} found)</h4>
            <div className="bg-white rounded-xl border border-gray-200 max-h-64 overflow-y-auto">
              {eligibleDonors.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {eligibleDonors.map(donor => {
                    const distance = hospital ? Math.sqrt(
                        Math.pow(hospital.location.lat - donor.location.lat, 2) +
                        Math.pow(hospital.location.lng - donor.location.lng, 2)
                    ).toFixed(1) : 0;
                    return (
                        <li key={donor.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center">
                                <UserCircleIcon className="h-10 w-10 text-green-500 mr-4" />
                                <div>
                                    <p className="font-semibold text-gray-800">{donor.name}</p>
                                    <p className="text-sm text-gray-500">Last Donated: {donor.lastDonation}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">
                                    ~{distance} km away
                                </p>
                            </div>
                        </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No eligible donors found within the search radius.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-200 flex justify-end space-x-4 flex-shrink-0 bg-gray-50 rounded-b-2xl">
          <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-5 rounded-lg transition-colors">
            Close
          </button>
          <button 
            type="button" 
            onClick={handleNotifyAll}
            disabled={eligibleDonors.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg transition-transform transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none">
            <UsersIcon className="h-5 w-5 mr-2" />
            Notify All ({eligibleDonors.length})
          </button>
        </div>
        <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
          `}</style>
      </div>
    </div>
  );
};

export default RequestDetailsModal;