import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AuthService, DatabaseService, User } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        // In a real app, this would check Firebase auth state
        const savedUser = localStorage.getItem('saludconecta_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          const profile = await DatabaseService.getUserProfile(userData.id);
          if (profile) {
            setUser(profile);
          }
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await AuthService.login(email, password);
      
      if (result.success && result.user) {
        // Get full user profile from database
        const profile = await DatabaseService.getUserProfile(result.user.id);
        if (profile) {
          setUser(profile);
          localStorage.setItem('saludconecta_user', JSON.stringify(profile));
        }
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Error al iniciar sesión' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const result = await AuthService.register(email, password, name);
      
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('saludconecta_user', JSON.stringify(result.user));
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Error al crear cuenta' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
      localStorage.removeItem('saludconecta_user');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { success: false, error: 'Usuario no autenticado' };

    try {
      const result = await DatabaseService.updateUserProfile(user.id, data);
      
      if (result.success) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('saludconecta_user', JSON.stringify(updatedUser));
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Error al actualizar perfil' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const result = await AuthService.forgotPassword(email);
      return result;
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}