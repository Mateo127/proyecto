import { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { useAuth } from '../../services/useAuth';
import { VideoCallService } from '../../services/firebase';
import { SaludButton } from '../SaludButton';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, MessageCircle, FileText, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export function VideoCallScreen() {
  const { setCurrentScreen, currentAppointmentId, setIsVideoCallActive } = useApp();
  const { user } = useAuth();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStarted, setCallStarted] = useState(false);
  const [doctorJoined, setDoctorJoined] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    // Simulate call initialization
    const initCall = async () => {
      if (currentAppointmentId) {
        try {
          const result = await VideoCallService.initializeCall(currentAppointmentId);
          if (result.success) {
            setIsConnecting(false);
            setCallStarted(true);
            
            // Simulate doctor joining after 3 seconds
            setTimeout(() => {
              setDoctorJoined(true);
              toast.success('Dr. Carlos Ruiz se ha unido a la llamada');
            }, 3000);
          }
        } catch (error) {
          toast.error('Error al inicializar la videollamada');
          endCall();
        }
      }
    };

    initCall();
  }, [currentAppointmentId]);

  useEffect(() => {
    // Call duration timer
    let interval: NodeJS.Timeout;
    
    if (callStarted && doctorJoined) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStarted, doctorJoined]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast.info(isVideoEnabled ? 'Video desactivado' : 'Video activado');
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast.info(isAudioEnabled ? 'Micrófono silenciado' : 'Micrófono activado');
  };

  const endCall = async () => {
    try {
      if (currentAppointmentId) {
        await VideoCallService.endCall(currentAppointmentId);
      }
      setIsVideoCallActive(false);
      setCurrentScreen('dashboard');
      toast.success('Videollamada finalizada');
    } catch (error) {
      toast.error('Error al finalizar la llamada');
    }
  };

  const openChat = () => {
    setCurrentScreen('chat');
    toast.info('Abriendo chat durante la consulta');
  };

  const takeScreenshot = () => {
    toast.info('Captura de pantalla guardada');
  };

  const shareScreen = () => {
    toast.info('Compartir pantalla iniciado');
  };

  return (
    <div className="h-screen bg-gray-900 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900" />
      
      {/* Status bar */}
      <div className="relative z-10 flex justify-between items-center p-4 text-white">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm">
            {isConnecting ? 'Conectando...' : doctorJoined ? 'En llamada' : 'Esperando al doctor'}
          </span>
        </div>
        
        {callStarted && doctorJoined && (
          <div className="bg-black/30 px-3 py-1 rounded-full">
            <span className="text-sm">{formatDuration(callDuration)}</span>
          </div>
        )}
      </div>

      {/* Video container */}
      <div className="relative z-10 flex-1 px-4 pb-32">
        {/* Main video (doctor) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-80 bg-gray-800 rounded-2xl mb-4 relative overflow-hidden"
        >
          {doctorJoined ? (
            <>
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&crop=face"
                alt="Dr. Carlos Ruiz"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                <span className="text-white text-sm">Dr. Carlos Ruiz</span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Video size={24} />
                </div>
                <p className="text-lg">Esperando al doctor...</p>
                <p className="text-sm text-gray-400 mt-2">Se unirá en unos momentos</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* User video (small) */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-20 right-6 w-32 h-24 bg-gray-800 rounded-xl overflow-hidden border-2 border-white"
        >
          {isVideoEnabled ? (
            <>
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face'}
                alt={user?.name || 'Usuario'}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-white text-xs bg-black/50 px-1 rounded">
                Tú
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-700">
              <VideoOff size={16} className="text-gray-400" />
            </div>
          )}
        </motion.div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg p-6"
      >
        <div className="flex justify-center items-center space-x-4">
          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isAudioEnabled 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isAudioEnabled ? (
              <Mic size={20} className="text-white" />
            ) : (
              <MicOff size={20} className="text-white" />
            )}
          </button>

          {/* Video toggle */}
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isVideoEnabled 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isVideoEnabled ? (
              <Video size={20} className="text-white" />
            ) : (
              <VideoOff size={20} className="text-white" />
            )}
          </button>

          {/* End call */}
          <button
            onClick={endCall}
            className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all transform hover:scale-105"
          >
            <PhoneOff size={24} className="text-white" />
          </button>

          {/* Chat */}
          <button
            onClick={openChat}
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all"
          >
            <MessageCircle size={20} className="text-white" />
          </button>

          {/* Screenshot */}
          <button
            onClick={takeScreenshot}
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all"
          >
            <Camera size={20} className="text-white" />
          </button>
        </div>

        {/* Additional info */}
        <div className="text-center mt-4">
          <p className="text-white text-sm">
            Consulta médica virtual - Mantén la privacidad y confidencialidad
          </p>
        </div>
      </motion.div>

      {/* Connection status overlay */}
      {isConnecting && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Conectando a la videollamada...</p>
            <p className="text-sm text-gray-400 mt-2">Esto puede tomar unos segundos</p>
          </div>
        </div>
      )}
    </div>
  );
}