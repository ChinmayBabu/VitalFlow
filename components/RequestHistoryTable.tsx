import React from 'react';
import { BloodRequest } from '../types';
import { mockHospitals } from '../constants';

interface RequestHistoryTableProps {
  requests: BloodRequest[];
}

const getStatusPill = (status: string) => {
    let colorClasses = '';
    switch (status) {
        case 'Open': colorClasses = 'bg-green-100 text-green-800'; break;
        case 'In Progress': colorClasses = 'bg-yellow-100 text-yellow-800'; break;
        case 'Fulfilled': colorClasses = 'bg-blue-100 text-blue-800'; break;
        default: colorClasses = 'bg-gray-100 text-gray-800';
    }
    return <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses}`}>{status}</span>;
}

const RequestHistoryTable: React.FC<RequestHistoryTableProps> = ({ requests }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hospital</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Blood Type</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Urgency</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map(request => {
              const hospital = mockHospitals.find(h => h.id === request.hospitalId);
              const isFulfilled = request.status === 'Fulfilled';

              return (
                <tr key={request.id} className={`${isFulfilled ? 'bg-gray-50' : 'hover:bg-gray-50/50 transition-colors'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${isFulfilled ? 'text-gray-500' : 'text-gray-900'}`}>{hospital?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${isFulfilled ? 'text-gray-500' : 'text-gray-900'}`}>{request.bloodType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isFulfilled ? 'text-gray-500' : 'text-gray-900'}`}>{request.urgency}</div>
                  </td>
                   <td className={`px-6 py-4 whitespace-nowrap text-sm ${isFulfilled ? 'text-gray-500' : 'text-gray-700'}`}>
                    {new Date(request.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusPill(request.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestHistoryTable;