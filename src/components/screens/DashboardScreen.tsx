import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Video, 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  User, 
  Settings, 
  Bell,
  Search,
  Activity,
  Clock,
  MapPin,
  VideoIcon,
  Phone
} from 'lucide-react';
import { useApp } from '../AppContext';
import { useAuth } from '../../services/useAuth';
import { SaludButton } from '../SaludButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { NotificationCenter } from '../NotificationCenter';
import { DatabaseService, VideoCallService, Appointment } from '../../services/firebase';
import { toast } from 'sonner@2.0.3';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  screen: any;
}

const quickActions: QuickAction[] = [
  {
    id: 'videocall',
    title: 'Videoconsulta',
    icon: <Video className="w-6 h-6" />,
    color: 'bg-[--salud-blue]',
    screen: 'video-call'
  },
  {
    id: 'agenda',
    title: 'Agendar cita',
    icon: <Calendar className="w-6 h-6" />,
    color: 'bg-[--salud-green]',
    screen: 'calendar'
  },
  {
    id: 'chat',
    title: 'Chat médico',
    icon: <MessageCircle className="w-6 h-6" />,
    color: 'bg-purple-500',
    screen: 'chat'
  },
  {
    id: 'recursos',
    title: 'Recursos',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-orange-500',
    screen: 'resources'
  }
];

export function DashboardScreen() {
  const { setCurrentScreen, notifications, setCurrentAppointmentId, setIsVideoCallActive } = useApp();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const loadAppointments = async () => {
    if (!user) return;
    
    try {
      const userAppointments = await DatabaseService.getAppointments(user.id);
      setAppointments(userAppointments);
    } catch (error) {
      toast.error('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinVideoCall = async (appointment: Appointment) => {
    try {
      setCurrentAppointmentId(appointment.id);
      setIsVideoCallActive(true);
      setCurrentScreen('video-call');
    } catch (error) {
      toast.error('Error al iniciar la videollamada');
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.id === 'videocall') {
      // For demo purposes, create a mock appointment
      setCurrentAppointmentId('demo-call-' + Date.now());
      setIsVideoCallActive(true);
      setCurrentScreen('video-call');
    } else {
      setCurrentScreen(action.screen);
    }
  };

  return (
    <div className="min-h-screen bg-[--salud-light-gray]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white px-6 py-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <ImageWithFallback
                src={user?.avatar || ''}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[--salud-green] rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[--salud-dark]">
                Hola, {user?.name?.split(' ')[0] || 'Usuario'}
              </h1>
              <p className="text-sm text-[--salud-gray]">¿Cómo te sientes hoy?</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <NotificationCenter />
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings className="w-6 h-6 text-[--salud-gray]" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[--salud-gray]" />
          <input
            type="text"
            placeholder="Buscar especialistas, síntomas..."
            className="w-full pl-10 pr-4 py-3 bg-[--salud-light-gray] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[--salud-blue] focus:border-transparent outline-none transition-all"
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Health Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gradient-to-r from-[--salud-blue] to-blue-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Estado de salud</h3>
              <p className="text-blue-100 mt-1">Últimas 24 horas</p>
            </div>
            <Activity className="w-8 h-8 text-blue-200" />
          </div>
          <div className="flex items-center space-x-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">72</div>
              <div className="text-xs text-blue-200">BPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-xs text-blue-200">SpO2</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">36.5°</div>
              <div className="text-xs text-blue-200">Temp</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-[--salud-dark] mb-4">Acciones rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickAction(action)}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3`}>
                  {action.icon}
                </div>
                <h4 className="font-medium text-[--salud-dark] text-left">{action.title}</h4>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[--salud-dark]">Próximas citas</h3>
            <button 
              onClick={() => setCurrentScreen('calendar')}
              className="text-[--salud-blue] text-sm font-medium hover:underline"
            >
              Ver todas
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ) : appointments.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-[--salud-gray]">No tienes citas programadas</p>
                <SaludButton 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setCurrentScreen('calendar')}
                >
                  Agendar cita
                </SaludButton>
              </div>
            ) : (
              appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="bg-white p-4 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[--salud-dark]">{appointment.doctorName}</h4>
                      <p className="text-sm text-[--salud-gray]">Consulta médica</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-[--salud-gray]">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.date} - {appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-[--salud-gray]">
                          {appointment.type === 'video' ? (
                            <Video className="w-4 h-4" />
                          ) : appointment.type === 'chat' ? (
                            <MessageCircle className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span className="capitalize">{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                    {appointment.type === 'video' ? (
                      <SaludButton 
                        size="sm"
                        onClick={() => handleJoinVideoCall(appointment)}
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Unirse
                      </SaludButton>
                    ) : appointment.type === 'chat' ? (
                      <SaludButton 
                        size="sm" 
                        variant="outline"
                        onClick={() => setCurrentScreen('chat')}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </SaludButton>
                    ) : (
                      <SaludButton size="sm" variant="outline">
                        Ver detalles
                      </SaludButton>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1">
            <div className="p-2 bg-[--salud-blue] rounded-full">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[--salud-blue]">Inicio</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('calendar')}
            className="flex flex-col items-center space-y-1"
          >
            <Calendar className="w-6 h-6 text-[--salud-gray]" />
            <span className="text-xs text-[--salud-gray]">Agenda</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('chat')}
            className="flex flex-col items-center space-y-1"
          >
            <MessageCircle className="w-6 h-6 text-[--salud-gray]" />
            <span className="text-xs text-[--salud-gray]">Chat</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('profile')}
            className="flex flex-col items-center space-y-1"
          >
            <User className="w-6 h-6 text-[--salud-gray]" />
            <span className="text-xs text-[--salud-gray]">Perfil</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}