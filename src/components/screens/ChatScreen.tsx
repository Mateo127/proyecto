import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Mic, 
  Phone, 
  Video, 
  MoreVertical,
  Circle
} from 'lucide-react';
import { useApp } from '../AppContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: string;
  type?: 'text' | 'image' | 'audio';
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hola, ¿en qué puedo ayudarte hoy?',
    sender: 'doctor',
    timestamp: '10:30'
  },
  {
    id: '2',
    text: 'Hola doctora, he estado sintiendo dolor de cabeza frecuente últimamente',
    sender: 'user',
    timestamp: '10:32'
  },
  {
    id: '3',
    text: 'Entiendo. ¿Desde cuándo has estado experimentando estos dolores de cabeza? ¿Hay algún factor que los desencadene?',
    sender: 'doctor',
    timestamp: '10:33'
  },
  {
    id: '4',
    text: 'Comenzaron hace una semana aproximadamente. Parecen empeorar cuando trabajo mucho tiempo frente a la computadora.',
    sender: 'user',
    timestamp: '10:35'
  }
];

export function ChatScreen() {
  const { setCurrentScreen } = useApp();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Gracias por la información. Es probable que sea fatiga visual. Te recomiendo tomar descansos cada 20 minutos y mantener una buena postura.',
          sender: 'doctor',
          timestamp: new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        setMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[--salud-light-gray] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white px-6 py-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[--salud-gray]" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ImageWithFallback
                  src="https://ui-avatars.com/api/?name=Dra+Maria+Gonzalez&background=10b981&color=fff"
                  alt="Doctor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="font-semibold text-[--salud-dark]">Dra. María González</h2>
                <div className="flex items-center space-x-1">
                  <Circle className="w-2 h-2 text-green-500 fill-current" />
                  <span className="text-xs text-green-600">En línea</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-[--salud-gray]" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-5 h-5 text-[--salud-gray]" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-[--salud-gray]" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-[--salud-blue] text-white rounded-br-md'
                  : 'bg-white text-[--salud-dark] rounded-bl-md shadow-sm'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-[--salud-gray]'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white border-t border-gray-200 px-6 py-4"
      >
        <div className="flex items-center space-x-3">
          <button className="p-2 text-[--salud-gray] hover:text-[--salud-blue] transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
              className="w-full px-4 py-3 bg-[--salud-light-gray] rounded-full border border-gray-200 focus:ring-2 focus:ring-[--salud-blue] focus:border-transparent outline-none transition-all"
            />
          </div>
          <button className="p-2 text-[--salud-gray] hover:text-[--salud-blue] transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-[--salud-blue] text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}