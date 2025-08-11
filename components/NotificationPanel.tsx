import React from 'react';
import { Alert } from '../types';
import { XMarkIcon } from './icons/Icons';

interface NotificationPanelProps {
  alerts: Alert[];
  onClose: () => void;
}

const getAlertIcon = (title: string) => {
    if (title.toLowerCase().includes('critical')) {
        return <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
    }
    if (title.toLowerCase().includes('warning')) {
        return <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
    }
    return <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ alerts, onClose }) => {
  return (
    <div className="absolute top-20 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 animate-fade-in-down">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alerts.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {alerts.map(alert => (
              <li key={alert.id} className={`p-4 transition-colors hover:bg-gray-50 ${!alert.read ? 'bg-blue-50/50' : ''}`}>
                <div className="flex items-start space-x-3">
                    <div className="pt-1.5">{getAlertIcon(alert.title)}</div>
                    <div>
                        <p className="font-semibold text-sm text-gray-800">{alert.title}</p>
                        <p className="text-sm text-gray-500">{alert.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-center text-sm text-gray-500">No new notifications.</p>
        )}
      </div>
      <div className="p-2 bg-gray-50 text-center text-xs rounded-b-2xl border-t border-gray-200">
          <button className="text-blue-600 hover:underline font-semibold">View all</button>
      </div>
       <style>{`
        @keyframes fade-in-down {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-down {
            animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NotificationPanel;