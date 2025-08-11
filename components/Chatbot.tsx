import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { PaperAirplaneIcon, SparklesIcon, UserIcon } from './icons/Icons';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
     setMessages([{
        sender: 'ai',
        text: "Hello! I'm here to help with some pre-donation eligibility questions. To start, could you tell me if you've taken any new medications in the last 3 months?"
     }]);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await getChatbotResponse(input);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        sender: 'ai',
        text: 'Sorry, I seem to be having trouble connecting. Please try again later.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <SparklesIcon className="h-6 w-6 text-blue-500 mr-3" />
          AI Pre-Screening Assistant
        </h2>
        <p className="text-sm text-gray-500 mt-1">Answer a few questions to check your donation eligibility.</p>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-sm"><SparklesIcon className="h-6 w-6 text-white"/></div>}
            <div className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-lg'}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
            {msg.sender === 'user' && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shadow-sm"><UserIcon className="h-6 w-6 text-gray-600"/></div>}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-3 justify-start">
                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"><SparklesIcon className="h-6 w-6 text-white"/></div>
                <div className="max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-lg">
                    <div className="flex items-center space-x-1.5">
                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex items-center bg-gray-100 rounded-xl border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            className="w-full bg-transparent p-3 text-gray-800 placeholder-gray-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 text-gray-500 disabled:text-gray-300 enabled:hover:text-blue-600 transition-colors"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;