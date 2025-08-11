import React from 'react';
import { Donor, Notification } from '../types';
import { ClipboardDocumentCheckIcon, UserCircleIcon } from './icons/Icons';

interface PostDonationSurveyProps {
  donors: Donor[];
  onInitiateFollowUp: (donor: Donor) => void;
}

const PostDonationSurvey: React.FC<PostDonationSurveyProps> = ({ donors, onInitiateFollowUp }) => {
    // Simulate donors who recently donated and need a survey
    const surveyNeededDonors = donors.filter(d => new Date(d.lastDonation) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).slice(0, 4);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
       <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <ClipboardDocumentCheckIcon className="h-6 w-6 mr-3 text-green-500" />
        Post-Donation Follow-up
      </h2>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {surveyNeededDonors.length > 0 ? surveyNeededDonors.map(donor => (
           <div key={donor.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
           <div className="flex items-center">
             <UserCircleIcon className="h-10 w-10 text-gray-400 mr-4" />
             <div>
               <p className="font-semibold text-gray-800">{donor.name}</p>
               <p className="text-xs text-gray-500">Donated on: {donor.lastDonation}</p>
             </div>
           </div>
           <button 
             onClick={() => onInitiateFollowUp(donor)}
             className="bg-green-100 text-green-700 hover:bg-green-200 text-xs font-bold py-2 px-3 rounded-lg transition-colors"
           >
             Send Follow-up
           </button>
         </div>
        )) : <p className="text-center text-gray-500 py-8">No recent donations require follow-up.</p>}
      </div>
    </div>
  );
};

export default PostDonationSurvey;