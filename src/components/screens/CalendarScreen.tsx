import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin,
  Video,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useApp } from '../AppContext';
import { SaludButton } from '../SaludButton';

interface Appointment {
  id: string;
  title: string;
  doctor: string;
  time: string;
  type: 'video' | 'presencial';
  status: 'confirmada' | 'pendiente' | 'completada';
}

const appointments: Record<string, Appointment[]> = {
  '15': [
    {
      id: '1',
      title: 'Consulta Cardiología',
      doctor: 'Dra. María González',
      time: '10:30 AM',
      type: 'video',
      status: 'confirmada'
    }
  ],
  '18': [
    {
      id: '2',
      title: 'Medicina General',
      doctor: 'Dr. Carlos Ruiz',
      time: '3:00 PM',
      type: 'presencial',
      status: 'confirmada'
    }
  ],
  '22': [
    {
      id: '3',
      title: 'Seguimiento',
      doctor: 'Dra. Ana López',
      time: '11:00 AM',
      type: 'video',
      status: 'pendiente'
    }
  ]
};

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export function CalendarScreen() {
  const { setCurrentScreen } = useApp();
  const [selectedDate, setSelectedDate] = useState(15);
  const [currentMonth, setCurrentMonth] = useState(0); // January = 0
  const [currentYear, setCurrentYear] = useState(2025);

  // Generate calendar days
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const selectedAppointments = appointments[selectedDate.toString()] || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completada':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[--salud-gray]" />
          </button>
          <h1 className="text-xl font-semibold text-[--salud-dark]">Mi agenda</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Plus className="w-6 h-6 text-[--salud-gray]" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Month Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[--salud-gray]" />
            </button>
            <h2 className="text-lg font-semibold text-[--salud-dark]">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[--salud-gray]" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm text-[--salud-gray] py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                onClick={() => day && setSelectedDate(day)}
                disabled={!day}
                className={`
                  aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                  ${!day ? 'invisible' : ''}
                  ${day === selectedDate 
                    ? 'bg-[--salud-blue] text-white' 
                    : 'hover:bg-[--salud-light-gray] text-[--salud-dark]'
                  }
                  ${appointments[day?.toString()] ? 'relative' : ''}
                `}
              >
                {day}
                {appointments[day?.toString()] && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[--salud-green] rounded-full" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Selected Day Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[--salud-dark]">
              {selectedDate} de {monthNames[currentMonth]}
            </h3>
            <span className="text-sm text-[--salud-gray]">
              {selectedAppointments.length} cita{selectedAppointments.length !== 1 ? 's' : ''}
            </span>
          </div>

          {selectedAppointments.length > 0 ? (
            <div className="space-y-3">
              {selectedAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-[--salud-dark]">{appointment.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-[--salud-gray] mb-3">{appointment.doctor}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-[--salud-gray]">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-[--salud-gray]">
                          {appointment.type === 'video' ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                    <SaludButton size="sm" className="ml-4">
                      {appointment.type === 'video' ? 'Unirse' : 'Ver detalles'}
                    </SaludButton>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-xl p-8 text-center"
            >
              <CalendarIcon className="w-12 h-12 text-[--salud-gray] mx-auto mb-4" />
              <h4 className="font-medium text-[--salud-dark] mb-2">No hay citas programadas</h4>
              <p className="text-[--salud-gray] text-sm mb-4">
                Agenda una consulta médica para este día
              </p>
              <SaludButton size="sm">
                Agendar cita
              </SaludButton>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}