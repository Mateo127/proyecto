import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { SaludButton } from '../SaludButton';
import { SaludInput } from '../SaludInput';
import { useApp } from '../AppContext';

export function RegisterScreen() {
  const { setCurrentScreen, setUser, setIsAuthenticated } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Simulate registration
      setUser({
        name: formData.name,
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=2563eb&color=fff`
      });
      setIsAuthenticated(true);
      setCurrentScreen('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={() => setCurrentScreen('onboarding3')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[--salud-gray]" />
        </button>
        <h1 className="text-xl font-semibold text-[--salud-dark]">Crear cuenta</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 pb-6"
      >
        {/* Welcome text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[--salud-dark] mb-2">
            ¡Bienvenido a SaludConecta!
          </h2>
          <p className="text-[--salud-gray]">
            Crea tu cuenta para acceder a todos nuestros servicios médicos
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <SaludInput
              label="Nombre completo"
              placeholder="Ingresa tu nombre"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              icon={<User className="w-5 h-5" />}
              error={errors.name}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SaludInput
              label="Email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              error={errors.email}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative">
              <SaludInput
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-[--salud-gray] hover:text-[--salud-blue] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <SaludInput
              label="Confirmar contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              icon={<Lock className="w-5 h-5" />}
              error={errors.confirmPassword}
            />
          </motion.div>
        </div>

        {/* Terms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6"
        >
          <p className="text-sm text-[--salud-gray] text-center">
            Al crear una cuenta, aceptas nuestros{' '}
            <span className="text-[--salud-blue] underline">Términos de Servicio</span>{' '}
            y{' '}
            <span className="text-[--salud-blue] underline">Política de Privacidad</span>
          </p>
        </motion.div>

        {/* Register Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <SaludButton
            onClick={handleRegister}
            size="lg"
            className="w-full"
          >
            Crear cuenta
          </SaludButton>
        </motion.div>

        {/* Login link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-[--salud-gray]">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => setCurrentScreen('login')}
              className="text-[--salud-blue] font-medium hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}