import React from 'react';
import { AppView } from '../types';
import { BarChartIcon, ChatBubbleLeftRightIcon, VideoCameraIcon, LifebuoyIcon } from './icons/Icons';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg relative ${
      isActive
        ? 'bg-blue-50 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full"></div>}
    {icon}
    <span className={`ml-3 font-semibold ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-24 flex items-center justify-center px-4 border-b border-gray-200">
        <LifebuoyIcon className="h-8 w-8 text-blue-600" />
        <h1 className="ml-3 text-2xl font-extrabold text-gray-800 tracking-tight">VitalFlow</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          icon={<BarChartIcon className="h-6 w-6" />}
          label="Dashboard"
          isActive={currentView === 'dashboard'}
          onClick={() => setCurrentView('dashboard')}
        />
        <NavLink
          icon={<ChatBubbleLeftRightIcon className="h-6 w-6" />}
          label="Pre-Screening Chat"
          isActive={currentView === 'chatbot'}
          onClick={() => setCurrentView('chatbot')}
        />
        <NavLink
          icon={<VideoCameraIcon className="h-6 w-6" />}
          label="Virtual Coaching"
          isActive={currentView === 'telehealth'}
          onClick={() => setCurrentView('telehealth')}
        />
      </nav>
      <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-100 p-4 rounded-xl text-center">
              <h3 className="text-gray-800 font-semibold">Jane Doe</h3>
              <p className="text-sm text-gray-500">Coordinator</p>
              <button className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold py-2 rounded-lg transition-colors">
                  Logout
              </button>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;