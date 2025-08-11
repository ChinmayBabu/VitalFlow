import React from 'react';
import { mockHospitals, mockDonors, SEARCH_RADIUS } from '../constants';
import { HospitalIcon, UserCircleIcon, TruckIcon } from './icons/Icons';
import { BloodRequest, Donor } from '../types';

interface DonorMapProps {
  selectedRequest: BloodRequest | null;
  eligibleDonors: Donor[];
}

const mapBgUrl = "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cg fill='%23F3F4F6' stroke='%23E5E7EB' stroke-width='1'%3E%3Cpath d='M400 300 L350 320 L300 350 L250 360 L200 350 L150 320 L100 300 L50 280 L0 250 V600 H800 V0 L750 50 L700 80 L650 120 L600 150 L550 200 L500 250 L450 280 Z'/%3E%3Cpath d='M100 100 L150 80 L200 70 L250 80 L300 100 L350 150 L380 200 L400 250 L350 260 L300 250 L250 220 L200 180 L150 150 Z'/%3E%3Cpath d='M500 80 L550 70 L600 80 L650 100 L600 120 L550 110 Z'/%3E%3C/g%3E%3C/svg%3E";

const DonorMap: React.FC<DonorMapProps> = ({ selectedRequest, eligibleDonors }) => {
  
  const donorsToDisplay = selectedRequest ? mockDonors : mockDonors.slice(0, 5); // Show all donors if selection, otherwise default
  const selectedHospital = selectedRequest ? mockHospitals.find(h => h.id === selectedRequest.hospitalId) : null;
  
  return (
    <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 h-80 relative overflow-hidden">
       <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url('${mapBgUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent"></div>

      {/* Search Radius */}
      {selectedRequest && selectedHospital && (
        <div 
          className="absolute rounded-full border-2 border-blue-500 border-dashed animate-pulse"
          style={{
            top: `${selectedHospital.location.lat}%`,
            left: `${selectedHospital.location.lng}%`,
            width: `${SEARCH_RADIUS * 2}%`,
            height: `${SEARCH_RADIUS * 2}%`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            background: 'rgba(59, 130, 246, 0.1)'
          }}
        />
      )}

      {/* Hospitals */}
      {mockHospitals.map(hospital => (
        <div key={hospital.id} className="absolute z-10" style={{ top: `${hospital.location.lat}%`, left: `${hospital.location.lng}%`, transform: 'translate(-50%, -50%)' }}>
          <HospitalIcon className={`h-8 w-8 text-red-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] ${selectedHospital?.id === hospital.id ? 'animate-bounce' : ''}`} />
          <span className="text-xs text-white bg-black/70 px-1.5 py-0.5 rounded-md absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-semibold">{hospital.name}</span>
        </div>
      ))}

      {/* Donors */}
      {donorsToDisplay.map(donor => {
         const isEligible = eligibleDonors.some(d => d.id === donor.id);
         const isSelected = selectedRequest != null;

         return (
             <div key={donor.id} className="absolute group transition-opacity duration-300" 
                  style={{ top: `${donor.location.lat}%`, left: `${donor.location.lng}%`, transform: 'translate(-50%, -50%)', opacity: (isSelected && !isEligible) ? 0.3 : 1 }}>
                <UserCircleIcon className={`h-6 w-6 transition-all duration-300 ${isEligible ? 'text-green-500 animate-pulse' : 'text-gray-500'}`} />
                <div className="hidden group-hover:block absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded-md py-1 px-2 border border-gray-600 z-20 shadow-lg">
                    {donor.name} ({donor.bloodType})
                </div>
            </div>
         );
      })}

      {/* Courier/Ambulance simulation */}
      <div className="absolute" style={{ top: '40%', left: '30%', animation: 'moveCourier 10s linear infinite' }}>
        <TruckIcon className="h-6 w-6 text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />
      </div>

      <style>{`
        @keyframes moveCourier {
          0% { transform: translate(0, 0) rotate(25deg); }
          25% { transform: translate(100px, -20px) rotate(25deg); }
          50% { transform: translate(120px, 80px) rotate(115deg); }
          75% { transform: translate(20px, 120px) rotate(205deg); }
          100% { transform: translate(0, 0) rotate(385deg); }
        }
      `}</style>

       <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg text-xs z-20 border border-gray-200 shadow-sm text-gray-700">
          <h4 className="font-bold text-gray-800">Legend</h4>
          <div className="flex items-center mt-1"><HospitalIcon className="h-4 w-4 text-red-600 mr-2" /> Hospital</div>
          <div className="flex items-center mt-1"><UserCircleIcon className="h-4 w-4 text-green-500 mr-2" /> Eligible Donor</div>
          {selectedRequest && <div className="flex items-center mt-1"><UserCircleIcon className="h-4 w-4 text-gray-500 mr-2" /> Other Donor</div>}
          <div className="flex items-center mt-1"><TruckIcon className="h-4 w-4 text-blue-600 mr-2" /> Courier</div>
        </div>
    </div>
  );
};

export default DonorMap;