import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Activity } from 'lucide-react';
import { useApp } from '../AppContext';

export function SplashScreen() {
  const { setCurrentScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding1');
    }, 3000);

    return () => clearTimeout(timer);
  }, [setCurrentScreen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[--salud-blue] to-blue-600 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          className="relative mb-8"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <div className="bg-white rounded-full p-6 shadow-lg">
            <Heart className="w-16 h-16 text-[--salud-blue]" fill="currentColor" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2 bg-[--salud-green] rounded-full p-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Activity className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl font-bold text-white mb-2"
        >
          SaludConecta
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-blue-100 text-lg"
        >
          Tu salud, siempre conectada
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-16"
      >
        <div className="flex space-x-2">
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </div>
  );
}