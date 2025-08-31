import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Camera, 
  Edit3, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Activity,
  FileText,
  Shield,
  Heart
} from 'lucide-react';
import { useApp } from '../AppContext';
import { SaludButton } from '../SaludButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const profileStats = [
  { label: 'Consultas', value: '12', icon: Activity },
  { label: 'Recetas', value: '8', icon: FileText },
  { label: 'Estudios', value: '3', icon: Heart }
];

const profileSections = [
  {
    title: 'Información personal',
    items: [
      { label: 'Teléfono', value: '+52 555 123 4567', icon: Phone },
      { label: 'Email', value: 'usuario@email.com', icon: Mail },
      { label: 'Dirección', value: 'Ciudad de México, México', icon: MapPin },
      { label: 'Fecha de nacimiento', value: '15 de marzo, 1990', icon: Calendar }
    ]
  }
];

export function ProfileScreen() {
  const { user, setCurrentScreen } = useApp();

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
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[--salud-gray]" />
          </button>
          <h1 className="text-xl font-semibold text-[--salud-dark]">Mi perfil</h1>
          <button 
            onClick={() => setCurrentScreen('settings')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Edit3 className="w-6 h-6 text-[--salud-gray]" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl p-6"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <ImageWithFallback
                src={user?.avatar || ''}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute -bottom-2 -right-2 bg-[--salud-blue] rounded-full p-2 text-white shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-[--salud-dark] mb-1">
              {user?.name || 'Usuario'}
            </h2>
            <p className="text-[--salud-gray] mb-4">Paciente verificado</p>
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">Verificado</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-3 gap-4"
        >
          {profileStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-4 text-center"
            >
              <div className="bg-[--salud-blue] bg-opacity-10 rounded-full p-3 w-fit mx-auto mb-2">
                <stat.icon className="w-5 h-5 text-[--salud-blue]" />
              </div>
              <div className="text-2xl font-bold text-[--salud-dark] mb-1">{stat.value}</div>
              <div className="text-sm text-[--salud-gray]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Profile Information */}
        {profileSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + sectionIndex * 0.1, duration: 0.6 }}
            className="bg-white rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-[--salud-dark] mb-4">{section.title}</h3>
            <div className="space-y-4">
              {section.items.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-[--salud-light-gray] rounded-full p-2">
                      <item.icon className="w-4 h-4 text-[--salud-gray]" />
                    </div>
                    <div>
                      <div className="text-sm text-[--salud-gray]">{item.label}</div>
                      <div className="font-medium text-[--salud-dark]">{item.value}</div>
                    </div>
                  </div>
                  <button className="text-[--salud-blue] p-1">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-3 pb-20"
        >
          <SaludButton
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => {}}
          >
            Descargar historial médico
          </SaludButton>
          <SaludButton
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => setCurrentScreen('settings')}
          >
            Configuración de cuenta
          </SaludButton>
        </motion.div>
      </div>
    </div>
  );
}