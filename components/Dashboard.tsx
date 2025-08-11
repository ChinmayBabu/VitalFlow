import React, { useState, useEffect, useMemo } from 'react';
import EmergencyRequestCard from './EmergencyRequestCard';
import InventoryLevels from './InventoryLevels';
import DonorMap from './DonorMap';
import GanttChart from './GanttChart';
import ToastContainer from './Toast';
import RequestDetailsModal from './RequestDetailsModal';
import NotificationPanel from './NotificationPanel';
import RetentionAnalytics from './RetentionAnalytics';
import PostDonationSurvey from './PostDonationSurvey';
import FollowUpModal from './FollowUpModal';
import ReachOutModal from './ReachOutModal';
import RequestHistoryTable from './RequestHistoryTable';
import { mockRequests, mockInventory, mockTasks, mockHospitals, mockDonors, SEARCH_RADIUS, mockAlerts } from '../constants';
import { BellIcon, PlusCircleIcon, XMarkIcon } from './icons/Icons';
import { BloodRequest, BloodType, Notification, Donor, Alert, BloodRequestStatus } from '../types';

const Dashboard: React.FC = () => {
  const [requests, setRequests] = useState<BloodRequest[]>(mockRequests);
  const [isNewRequestModalOpen, setNewRequestModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);

  // State for interactive map
  const [selectedRequestForMap, setSelectedRequestForMap] = useState<BloodRequest | null>(null);
  const [eligibleDonorsForMap, setEligibleDonorsForMap] = useState<Donor[]>([]);
  
  // State for details modal
  const [detailsRequest, setDetailsRequest] = useState<BloodRequest | null>(null);
  
  // State for follow-up modal
  const [selectedDonorForFollowUp, setSelectedDonorForFollowUp] = useState<Donor | null>(null);
  
  // State for reach-out modal
  const [selectedDonorForReachOut, setSelectedDonorForReachOut] = useState<Donor | null>(null);

  const activeRequests = useMemo(() => {
    return requests.filter(r => r.status !== 'Fulfilled');
  }, [requests]);

  const addNotification = (message: string, type: Notification['type']) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(0, prev.length -1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const handleAddNewRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRequest: BloodRequest = {
      id: `r${Date.now()}`,
      hospitalId: formData.get('hospitalId') as string,
      bloodType: formData.get('bloodType') as BloodType,
      units: Number(formData.get('units')),
      urgency: formData.get('urgency') as 'Critical' | 'High' | 'Medium',
      timestamp: new Date().toISOString(),
      status: 'Open',
    };
    setRequests(prevRequests => [newRequest, ...prevRequests]);
    setNewRequestModalOpen(false);
    addNotification(`New request for ${newRequest.bloodType} blood created.`, 'success');
  };

  const handleFindDonors = (request: BloodRequest) => {
    if (selectedRequestForMap?.id === request.id) {
      setSelectedRequestForMap(null);
      setEligibleDonorsForMap([]);
      return;
    }

    addNotification(`Searching for ${request.bloodType} donors...`, 'info');
    setSelectedRequestForMap(request);

    setTimeout(() => {
        const hospital = mockHospitals.find(h => h.id === request.hospitalId);
        if (!hospital) return;

        const foundDonors = mockDonors.filter(donor => {
            if (donor.bloodType !== request.bloodType) return false;
            
            const distance = Math.sqrt(
                Math.pow(hospital.location.lat - donor.location.lat, 2) +
                Math.pow(hospital.location.lng - donor.location.lng, 2)
            );
            
            return distance <= SEARCH_RADIUS;
        });

        setEligibleDonorsForMap(foundDonors);
        addNotification(`Found ${foundDonors.length} eligible donors within radius.`, 'success');
    }, 1000); // Simulate network delay
  };
  
  const handleShowDetails = (request: BloodRequest) => {
    setDetailsRequest(request);
  };

  const handleUpdateRequestStatus = (requestId: string, status: BloodRequestStatus) => {
    setRequests(prev => prev.map(r => r.id === requestId ? {...r, status} : r));
    addNotification(`Request status updated to "${status}".`, 'info');
  };
  
  const handleInitiateFollowUp = (donor: Donor) => {
    setSelectedDonorForFollowUp(donor);
  };
  
  const handleSendFollowUp = (donor: Donor, message: string) => {
    addNotification(`Follow-up message sent to ${donor.name}.`, 'success');
    setSelectedDonorForFollowUp(null);
  };
  
  const handleInitiateReachOut = (donor: Donor) => {
    setSelectedDonorForReachOut(donor);
  };

  const handleSendReachOut = (donor: Donor, message: string) => {
    addNotification(`Personalized reach out sent to ${donor.name}.`, 'success');
    setSelectedDonorForReachOut(null);
  };


  return (
    <div className="space-y-8">
      <ToastContainer notifications={notifications} onDismiss={removeNotification} />
       {isNotificationPanelOpen && <NotificationPanel alerts={mockAlerts} onClose={() => setNotificationPanelOpen(false)} />}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Coordination Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setNotificationPanelOpen(true)}
            className="relative p-2 bg-white rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Open notifications"
          >
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-500 rounded-full border border-white"></span>
          </button>
          <button
            onClick={() => setNewRequestModalOpen(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg transition-transform transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            New Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
             <div className="flex justify-between items-baseline mb-4">
               <h2 className="text-2xl font-bold text-gray-800">Active Emergency Requests</h2>
               {selectedRequestForMap && (
                 <button 
                   onClick={() => handleFindDonors(selectedRequestForMap)} 
                   className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                   Clear Donor Selection
                  </button>
               )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeRequests.length > 0 ? activeRequests.map(request => (
                <EmergencyRequestCard
                  key={request.id}
                  request={request}
                  onFindDonors={handleFindDonors}
                  onShowDetails={handleShowDetails}
                  onUpdateRequestStatus={handleUpdateRequestStatus}
                  isSelected={selectedRequestForMap?.id === request.id}
                />
              )) : (
                <div className="md:col-span-2 text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-500">No active emergency requests.</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Orchestration Hub</h2>
            <GanttChart tasks={mockTasks} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Blood Inventory Levels</h2>
            <InventoryLevels inventory={mockInventory} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Donor & Logistics Map</h2>
            <DonorMap selectedRequest={selectedRequestForMap} eligibleDonors={eligibleDonorsForMap} />
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Donor Engagement & Follow-up</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RetentionAnalytics donors={mockDonors} onInitiateReachOut={handleInitiateReachOut} />
            <PostDonationSurvey donors={mockDonors} onInitiateFollowUp={handleInitiateFollowUp} />
        </div>
      </div>
      
       <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Request History</h2>
        <RequestHistoryTable requests={requests} />
      </div>


      {isNewRequestModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Create New Blood Request</h3>
              <button onClick={() => setNewRequestModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XMarkIcon className="h-7 w-7" />
              </button>
            </div>
            <form onSubmit={handleAddNewRequest}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700 mb-1.5">Hospital</label>
                  <select name="hospitalId" id="hospitalId" required className="w-full bg-gray-100 border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    {mockHospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1.5">Blood Type</label>
                  <select name="bloodType" id="bloodType" required className="w-full bg-gray-100 border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    {Object.values(BloodType).map(bt => <option key={bt} value={bt}>{bt}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="units" className="block text-sm font-medium text-gray-700 mb-1.5">Units Needed</label>
                  <input type="number" name="units" id="units" required min="1" defaultValue="1" className="w-full bg-gray-100 border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                </div>
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1.5">Urgency</label>
                  <select name="urgency" id="urgency" required className="w-full bg-gray-100 border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button type="button" onClick={() => setNewRequestModalOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-5 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg transition-transform transform hover:scale-105 shadow-lg hover:shadow-blue-500/50">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
          <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
          `}</style>
        </div>
      )}

      {detailsRequest && (
        <RequestDetailsModal 
            request={detailsRequest}
            onClose={() => setDetailsRequest(null)}
            addNotification={addNotification}
        />
      )}
      
      {selectedDonorForFollowUp && (
        <FollowUpModal
            donor={selectedDonorForFollowUp}
            onClose={() => setSelectedDonorForFollowUp(null)}
            onSend={handleSendFollowUp}
        />
      )}

      {selectedDonorForReachOut && (
        <ReachOutModal
          donor={selectedDonorForReachOut}
          onClose={() => setSelectedDonorForReachOut(null)}
          onSend={handleSendReachOut}
        />
      )}
    </div>
  );
};

export default Dashboard;