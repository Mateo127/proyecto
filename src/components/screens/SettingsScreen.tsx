import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Smartphone,
  Mail as MailIcon,
  Lock,
  Eye,
  FileText,
  Star
} from 'lucide-react';
import { useApp } from '../AppContext';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  action: 'navigate' | 'toggle' | 'logout';
  value?: boolean;
  hasChevron?: boolean;
}

const settingSections = [
  {
    title: 'Cuenta',
    items: [
      {
        id: 'profile',
        title: 'Información personal',
        subtitle: 'Nombre, email, teléfono',
        icon: User,
        action: 'navigate',
        hasChevron: true
      },
      {
        id: 'security',
        title: 'Seguridad y privacidad',
        subtitle: 'Contraseña, autenticación',
        icon: Shield,
        action: 'navigate',
        hasChevron: true
      }
    ]
  },
  {
    title: 'Notificaciones',
    items: [
      {
        id: 'push',
        title: 'Notificaciones push',
        subtitle: 'Recibir alertas en el dispositivo',
        icon: Smartphone,
        action: 'toggle',
        value: true
      },
      {
        id: 'email',
        title: 'Notificaciones por email',
        subtitle: 'Recordatorios de citas y resultados',
        icon: MailIcon,
        action: 'toggle',
        value: true
      },
      {
        id: 'sms',
        title: 'Mensajes SMS',
        subtitle: 'Confirmaciones y recordatorios',
        icon: Bell,
        action: 'toggle',
        value: false
      }
    ]
  },
  {
    title: 'Preferencias',
    items: [
      {
        id: 'dark-mode',
        title: 'Modo oscuro',
        subtitle: 'Cambiar apariencia de la aplicación',
        icon: Moon,
        action: 'toggle',
        value: false
      },
      {
        id: 'language',
        title: 'Idioma',
        subtitle: 'Español',
        icon: Globe,
        action: 'navigate',
        hasChevron: true
      }
    ]
  },
  {
    title: 'Soporte',
    items: [
      {
        id: 'help',
        title: 'Centro de ayuda',
        subtitle: 'Preguntas frecuentes y soporte',
        icon: HelpCircle,
        action: 'navigate',
        hasChevron: true
      },
      {
        id: 'privacy',
        title: 'Política de privacidad',
        icon: Eye,
        action: 'navigate',
        hasChevron: true
      },
      {
        id: 'terms',
        title: 'Términos de servicio',
        icon: FileText,
        action: 'navigate',
        hasChevron: true
      },
      {
        id: 'rate',
        title: 'Calificar la aplicación',
        icon: Star,
        action: 'navigate',
        hasChevron: true
      }
    ]
  }
] as { title: string; items: SettingItem[] }[];

export function SettingsScreen() {
  const { setCurrentScreen, setIsAuthenticated, setUser } = useApp();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    push: true,
    email: true,
    sms: false,
    'dark-mode': false
  });

  const handleToggleSetting = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentScreen('splash');
  };

  const handleSettingAction = (item: SettingItem) => {
    switch (item.action) {
      case 'toggle':
        handleToggleSetting(item.id);
        break;
      case 'navigate':
        // Handle navigation to specific settings screens
        console.log(`Navigate to ${item.id}`);
        break;
      case 'logout':
        handleLogout();
        break;
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
          <button
            onClick={() => setCurrentScreen('profile')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[--salud-gray]" />
          </button>
          <h1 className="text-xl font-semibold text-[--salud-dark]">Configuración</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-[--salud-dark]">{section.title}</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05, duration: 0.5 }}
                  onClick={() => handleSettingAction(item)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-[--salud-light-gray] rounded-full p-2">
                      <item.icon className="w-5 h-5 text-[--salud-gray]" />
                    </div>
                    <div>
                      <div className="font-medium text-[--salud-dark]">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-sm text-[--salud-gray]">{item.subtitle}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.action === 'toggle' && (
                      <div className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${settings[item.id] ? 'bg-[--salud-blue]' : 'bg-gray-300'}
                      `}>
                        <span className={`
                          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${settings[item.id] ? 'translate-x-6' : 'translate-x-1'}
                        `} />
                      </div>
                    )}
                    {item.hasChevron && (
                      <ChevronRight className="w-5 h-5 text-[--salud-gray]" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-2xl overflow-hidden"
        >
          <button
            onClick={handleLogout}
            className="w-full px-6 py-4 flex items-center space-x-3 hover:bg-red-50 transition-colors text-left"
          >
            <div className="bg-red-100 rounded-full p-2">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="font-medium text-red-600">Cerrar sesión</div>
              <div className="text-sm text-red-400">Salir de tu cuenta</div>
            </div>
          </button>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-[--salud-gray] text-sm pb-8"
        >
          <p>SaludConecta v1.0.0</p>
          <p className="mt-1">© 2025 SaludConecta. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </div>
  );
}