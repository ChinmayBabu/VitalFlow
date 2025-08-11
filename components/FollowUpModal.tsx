import React, { useState } from 'react';
import { Donor, MessageTemplate } from '../types';
import { mockFollowUpTemplates } from '../constants';
import { XMarkIcon, PaperAirplaneIcon } from './icons/Icons';

interface FollowUpModalProps {
    donor: Donor;
    onClose: () => void;
    onSend: (donor: Donor, message: string) => void;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({ donor, onClose, onSend }) => {
    const [message, setMessage] = useState('');

    const handleTemplateClick = (template: MessageTemplate) => {
        setMessage(template.content.replace(/\[Donor Name\]/g, donor.name));
    };

    const handleSend = () => {
        if (message.trim()) {
            onSend(donor, message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 flex flex-col max-h-[90vh] animate-slide-up">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
                    <h3 className="text-2xl font-bold text-gray-900">Send Follow-up to {donor.name}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="h-7 w-7" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 bg-gray-50">
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                        <textarea
                            id="message"
                            rows={8}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-white border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Write your personal message here..."
                        />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Use a template</h4>
                        <div className="flex flex-wrap gap-2">
                            {mockFollowUpTemplates.map(template => (
                                <button
                                    key={template.id}
                                    onClick={() => handleTemplateClick(template)}
                                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-semibold py-1.5 px-3 rounded-full transition-colors"
                                >
                                    {template.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-gray-200 flex justify-end space-x-4 flex-shrink-0 bg-gray-50 rounded-b-2xl">
                    <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-5 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg transition-transform transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                    >
                        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                        Send Message
                    </button>
                </div>
            </div>
            <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
          `}</style>
        </div>
    );
};

export default FollowUpModal;