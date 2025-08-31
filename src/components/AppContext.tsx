import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthProvider } from '../services/useAuth';
import { NotificationService } from '../services/firebase';

export type Screen = 
  | 'splash'
  | 'onboarding1'
  | 'onboarding2' 
  | 'onboarding3'
  | 'register'
  | 'login'
  | 'dashboard'
  | 'profile'
  | 'chat'
  | 'calendar'
  | 'resources'
  | 'settings'
  | 'video-call';

interface User {
  name?: string;
  email?: string;
  avatar?: string;
}

interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  isVideoCallActive: boolean;
  setIsVideoCallActive: (active: boolean) => void;
  currentAppointmentId: string | null;
  setCurrentAppointmentId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function AppContextProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState<string | null>(null);

  useEffect(() => {
    // Request notification permissions on app start
    NotificationService.requestPermission();

    // Add some demo notifications
    setTimeout(() => {
      addNotification({
        title: 'Cita programada',
        message: 'Tu cita con Dr. Carlos Ruiz es mañana a las 10:00',
        type: 'info'
      });
    }, 3000);
  }, []);

  const addNotification = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: AppNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Send browser notification if permission is granted
    NotificationService.sendLocalNotification(notification.title, notification.message);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
      notifications,
      addNotification,
      markNotificationAsRead,
      clearNotifications,
      isVideoCallActive,
      setIsVideoCallActive,
      currentAppointmentId,
      setCurrentAppointmentId
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </AuthProvider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}