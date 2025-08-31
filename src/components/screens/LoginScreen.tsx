import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { SaludButton } from '../SaludButton';
import { SaludInput } from '../SaludInput';
import { useApp } from '../AppContext';
import { useAuth } from '../../services/useAuth';
import { toast } from 'sonner@2.0.3';

export function LoginScreen() {
  const { setCurrentScreen, setUser, setIsAuthenticated } = useApp();
  const { login, forgotPassword, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setIsAuthenticated(true);
        setCurrentScreen('dashboard');
        toast.success('Inicio de sesión exitoso');
      } else {
        toast.error(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      toast.error('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      toast.error('Ingresa tu email para recuperar la contraseña');
      return;
    }

    try {
      const result = await forgotPassword(formData.email);
      if (result.success) {
        toast.success(result.message || 'Email de recuperación enviado');
      } else {
        toast.error(result.error || 'Error al enviar email');
      }
    } catch (error) {
      toast.error('Error de conexión');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={() => setCurrentScreen('register')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[--salud-gray]" />
        </button>
        <h1 className="text-xl font-semibold text-[--salud-dark]">Iniciar sesión</h1>
        <div className="w-10" />
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
            ¡Te damos la bienvenida!
          </h2>
          <p className="text-[--salud-gray]">
            Ingresa a tu cuenta para continuar con tu cuidado médico
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
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative">
              <SaludInput
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu contraseña"
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
        </div>

        {/* Forgot password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-right"
        >
          <button 
            onClick={handleForgotPassword}
            className="text-[--salud-blue] text-sm hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </motion.div>

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <SaludButton
            onClick={handleLogin}
            size="lg"
            className="w-full"
            disabled={isLoading || loading}
          >
            {isLoading || loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </SaludButton>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center my-8"
        >
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-[--salud-gray] text-sm">o</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </motion.div>

        {/* Social login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-3"
        >
          <SaludButton
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => {}}
          >
            Continuar con Google
          </SaludButton>
        </motion.div>

        {/* Register link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-[--salud-gray]">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => setCurrentScreen('register')}
              className="text-[--salud-blue] font-medium hover:underline"
            >
              Regístrate
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}