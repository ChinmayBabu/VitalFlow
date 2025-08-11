import React from 'react';
import { Notification } from '../types';
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from './icons/Icons';

interface ToastContainerProps {
  notifications: Notification[];
  onDismiss: (id: number) => void;
}

const toastIcons = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
  info: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
  error: <XCircleIcon className="h-6 w-6 text-red-500" />,
};

const Toast: React.FC<{ notification: Notification; onDismiss: (id: number) => void }> = ({ notification, onDismiss }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl pointer-events-auto flex items-center p-4 w-full max-w-sm">
      <div className="flex-shrink-0">{toastIcons[notification.type]}</div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-gray-800">{notification.message}</p>
      </div>
      <div className="ml-4 flex-shrink-0 flex">
        <button
          onClick={() => onDismiss(notification.id)}
          className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 rounded-md"
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const ToastContainer: React.FC<ToastContainerProps> = ({ notifications, onDismiss }) => {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {notifications.map(notification => (
          <Toast key={notification.id} notification={notification} onDismiss={onDismiss} />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;