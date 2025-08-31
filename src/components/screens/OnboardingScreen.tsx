import { motion } from 'motion/react';
import { ChevronRight, Video, Calendar, HeartHandshake } from 'lucide-react';
import { SaludButton } from '../SaludButton';
import { useApp } from '../AppContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface OnboardingData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  nextScreen: 'onboarding2' | 'onboarding3' | 'register';
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    title: "Consultas médicas",
    subtitle: "desde casa",
    description: "Conecta con especialistas certificados desde la comodidad de tu hogar, 24/7.",
    icon: <Video className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1631217872822-1c2546d6b864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBoZWFsdGglMjBhcHAlMjB0ZWxlbWVkaWNpbmV8ZW58MXx8fHwxNzU2NjAwNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    nextScreen: 'onboarding2'
  },
  {
    id: 2,
    title: "Agenda tu cita",
    subtitle: "en segundos",
    description: "Programa consultas de manera rápida y sencilla con médicos disponibles en tu zona.",
    icon: <Calendar className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1701673965165-5b2936d3dc85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwY2FsZW5kYXIlMjBhcHBvaW50bWVudHxlbnwxfHx8fDE3NTY2MDA1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    nextScreen: 'onboarding3'
  },
  {
    id: 3,
    title: "Cuidado personalizado",
    subtitle: "para ti",
    description: "Recibe atención médica adaptada a tus necesidades y historial clínico personal.",
    icon: <HeartHandshake className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1633613287441-3f72304088ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBoZWFsdGglMjBhcHAlMjB0ZWxlbWVkaWNpbmV8ZW58MXx8fHwxNzU2NjAwNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    nextScreen: 'register'
  }
];

interface OnboardingScreenProps {
  step: 1 | 2 | 3;
}

export function OnboardingScreen({ step }: OnboardingScreenProps) {
  const { setCurrentScreen } = useApp();
  const data = onboardingData[step - 1];

  const handleNext = () => {
    setCurrentScreen(data.nextScreen);
  };

  const handleSkip = () => {
    setCurrentScreen('register');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step 
                  ? 'w-8 bg-[--salud-blue]' 
                  : i < step 
                    ? 'w-6 bg-[--salud-green]'
                    : 'w-6 bg-gray-200'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleSkip}
          className="text-[--salud-gray] hover:text-[--salud-blue] transition-colors"
        >
          Saltar
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="bg-gradient-to-br from-[--salud-blue] to-blue-600 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <div className="text-white">
              {data.icon}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <ImageWithFallback
              src={data.image}
              alt={data.title}
              className="w-64 h-48 object-cover rounded-2xl mx-auto shadow-md"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-[--salud-dark] mb-2">
              {data.title}
            </h1>
            <h2 className="text-3xl font-bold text-[--salud-blue] mb-6">
              {data.subtitle}
            </h2>
            <p className="text-[--salud-gray] text-lg leading-relaxed max-w-sm mx-auto">
              {data.description}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="p-6"
      >
        <SaludButton
          onClick={handleNext}
          size="lg"
          className="w-full"
          icon={<ChevronRight className="w-5 h-5" />}
        >
          {step === 3 ? 'Comenzar' : 'Siguiente'}
        </SaludButton>
      </motion.div>
    </div>
  );
}