import React, { useState, useRef, useEffect } from 'react';
import { VideoCameraIcon, VideoCameraSlashIcon, MicrophoneIcon, PhoneXMarkIcon } from './icons/Icons';

const VideoCall: React.FC = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startSession = async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setIsSessionActive(true);
    } catch (err) {
      console.error("Error accessing media devices.", err);
      setError("Could not access camera and microphone. Please check your browser permissions.");
      setIsSessionActive(false);
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  
  useEffect(() => {
    if (stream) {
        stream.getAudioTracks().forEach(track => track.enabled = !isMuted);
    }
  }, [isMuted, stream]);

  useEffect(() => {
    if (stream) {
        stream.getVideoTracks().forEach(track => track.enabled = !isCameraOff);
    }
  }, [isCameraOff, stream]);


  const stopSession = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsSessionActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Virtual Donor Coaching</h2>
      <p className="text-gray-500 mb-8">Connect with a nurse for guidance and support.</p>
      
      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl relative flex items-center justify-center shadow-inner overflow-hidden">
        {isSessionActive && stream ? (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" muted />
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-1 rounded-xl border border-gray-700 w-1/4 aspect-video shadow-lg">
                <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-white font-semibold">Nurse Joy</p>
                </div>
            </div>
            {isCameraOff && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80"><VideoCameraSlashIcon className="h-20 w-20 text-white"/><p className="text-white mt-4 font-semibold">Camera is off</p></div>}
          </>
        ) : (
          <div className="text-center">
            <VideoCameraIcon className="h-20 w-20 text-gray-400 mx-auto" />
            <p className="mt-4 text-gray-500">Your session has not started yet.</p>
            {error && <p className="mt-4 text-red-500 px-4">{error}</p>}
          </div>
        )}
      </div>

      <div className="mt-8">
        {!isSessionActive ? (
          <button onClick={startSession} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all text-lg shadow-lg hover:scale-105 transform">
            Start Coaching Session
          </button>
        ) : (
          <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-full border border-gray-200">
            <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700 shadow-sm'}`}>
              <MicrophoneIcon className="h-6 w-6" />
            </button>
             <button onClick={() => setIsCameraOff(!isCameraOff)} className={`p-4 rounded-full transition-colors ${isCameraOff ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700 shadow-sm'}`}>
              <VideoCameraIcon className="h-6 w-6" />
            </button>
            <button onClick={stopSession} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full transition-colors flex items-center shadow-lg hover:scale-105 transform">
              <PhoneXMarkIcon className="h-6 w-6 mr-2" />
              End Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;