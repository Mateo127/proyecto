// Firebase Services Mock - Replace with real Firebase implementation
// npm install firebase @firebase/app @firebase/auth @firebase/firestore @firebase/storage

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "saludconecta-app.firebaseapp.com",
  projectId: "saludconecta-app",
  storageBucket: "saludconecta-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  birthDate?: string;
  medicalHistory?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'video' | 'chat' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  read: boolean;
}

export interface MedicalResource {
  id: string;
  title: string;
  description: string;
  category: 'article' | 'video' | 'tip' | 'emergency';
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  publishDate: string;
  readTime?: number;
}

// Authentication Services
export class AuthService {
  static async login(email: string, password: string) {
    try {
      // Mock implementation - replace with real Firebase auth
      console.log('Logging in with Firebase:', email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      return {
        success: true,
        user: {
          id: '1',
          email: email,
          name: 'Usuario Demo',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      };
    } catch (error) {
      return { success: false, error: 'Error al iniciar sesión' };
    }
  }

  static async register(email: string, password: string, name: string) {
    try {
      console.log('Registering with Firebase:', email, name);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        user: {
          id: Date.now().toString(),
          email: email,
          name: name,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      };
    } catch (error) {
      return { success: false, error: 'Error al crear cuenta' };
    }
  }

  static async logout() {
    try {
      console.log('Logging out from Firebase');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al cerrar sesión' };
    }
  }

  static async forgotPassword(email: string) {
    try {
      console.log('Sending password reset email to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Email de recuperación enviado' };
    } catch (error) {
      return { success: false, error: 'Error al enviar email' };
    }
  }
}

// Firestore Services
export class DatabaseService {
  static async getUserProfile(userId: string): Promise<User | null> {
    try {
      // Mock user data
      return {
        id: userId,
        email: 'usuario@saludconecta.com',
        name: 'María González',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face',
        phone: '+34 666 123 456',
        birthDate: '1985-03-15',
        medicalHistory: ['Hipertensión', 'Diabetes tipo 2'],
        emergencyContact: {
          name: 'Juan González',
          phone: '+34 666 654 321'
        }
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  static async updateUserProfile(userId: string, data: Partial<User>) {
    try {
      console.log('Updating user profile:', userId, data);
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al actualizar perfil' };
    }
  }

  static async getAppointments(userId: string): Promise<Appointment[]> {
    // Mock appointments data
    return [
      {
        id: '1',
        patientId: userId,
        doctorId: 'dr1',
        doctorName: 'Dr. Carlos Ruiz',
        date: '2025-09-05',
        time: '10:00',
        type: 'video',
        status: 'scheduled',
        notes: 'Consulta de seguimiento'
      },
      {
        id: '2',
        patientId: userId,
        doctorId: 'dr2',
        doctorName: 'Dra. Ana Martín',
        date: '2025-09-10',
        time: '15:30',
        type: 'chat',
        status: 'scheduled',
        notes: 'Revisión de resultados'
      }
    ];
  }

  static async createAppointment(appointment: Omit<Appointment, 'id'>) {
    try {
      console.log('Creating appointment:', appointment);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        appointmentId: Date.now().toString() 
      };
    } catch (error) {
      return { success: false, error: 'Error al crear cita' };
    }
  }

  static async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    // Mock chat messages
    return [
      {
        id: '1',
        senderId: 'dr1',
        senderName: 'Dr. Carlos Ruiz',
        message: 'Hola María, ¿cómo te encuentras hoy?',
        timestamp: '2025-08-31T09:00:00Z',
        type: 'text',
        read: true
      },
      {
        id: '2',
        senderId: 'user1',
        senderName: 'María González',
        message: 'Buenos días doctor, me encuentro mejor. La medicación está funcionando.',
        timestamp: '2025-08-31T09:05:00Z',
        type: 'text',
        read: true
      },
      {
        id: '3',
        senderId: 'dr1',
        senderName: 'Dr. Carlos Ruiz',
        message: 'Excelente. ¿Has tenido algún efecto secundario?',
        timestamp: '2025-08-31T09:10:00Z',
        type: 'text',
        read: false
      }
    ];
  }

  static async sendMessage(chatId: string, message: Omit<ChatMessage, 'id'>) {
    try {
      console.log('Sending message:', chatId, message);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, messageId: Date.now().toString() };
    } catch (error) {
      return { success: false, error: 'Error al enviar mensaje' };
    }
  }

  static async getMedicalResources(): Promise<MedicalResource[]> {
    return [
      {
        id: '1',
        title: 'Consejos para una alimentación saludable',
        description: 'Aprende los fundamentos de una dieta equilibrada y nutritiva.',
        category: 'article',
        content: 'Una alimentación saludable es fundamental para mantener un buen estado de salud...',
        imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop',
        publishDate: '2025-08-20',
        readTime: 5
      },
      {
        id: '2',
        title: 'Ejercicios de respiración para el estrés',
        description: 'Técnicas simples para reducir la ansiedad y mejorar tu bienestar.',
        category: 'video',
        content: 'Los ejercicios de respiración son una herramienta poderosa...',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/breathing-exercises.mp4',
        publishDate: '2025-08-25',
        readTime: 3
      },
      {
        id: '3',
        title: '🚨 Síntomas de emergencia cardiaca',
        description: 'Reconoce las señales de un posible infarto y actúa rápidamente.',
        category: 'emergency',
        content: 'Es crucial reconocer los síntomas de un ataque cardíaco...',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
        publishDate: '2025-08-30',
        readTime: 2
      }
    ];
  }
}

// Storage Services
export class StorageService {
  static async uploadFile(file: File, path: string) {
    try {
      console.log('Uploading file to Firebase Storage:', file.name, path);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock file URL
      const mockUrl = `https://firebasestorage.googleapis.com/v0/b/saludconecta-app.appspot.com/o/${encodeURIComponent(path)}?alt=media&token=mock-token`;
      
      return { success: true, downloadURL: mockUrl };
    } catch (error) {
      return { success: false, error: 'Error al subir archivo' };
    }
  }

  static async deleteFile(path: string) {
    try {
      console.log('Deleting file from Firebase Storage:', path);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al eliminar archivo' };
    }
  }
}

// Push Notifications Service
export class NotificationService {
  static async requestPermission() {
    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  static async sendLocalNotification(title: string, body: string) {
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          body,
          icon: '/icon-192x192.png',
          badge: '/icon-badge.png'
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  static async scheduleAppointmentReminder(appointment: Appointment) {
    console.log('Scheduling appointment reminder:', appointment);
    // In a real app, this would use Firebase Cloud Functions
    // to schedule push notifications
  }
}

// Video Call Service (using WebRTC)
export class VideoCallService {
  static async initializeCall(appointmentId: string) {
    try {
      console.log('Initializing video call for appointment:', appointmentId);
      
      // In a real implementation, you would:
      // 1. Use Firebase Functions to generate call tokens
      // 2. Initialize WebRTC peer connection
      // 3. Connect to video service (Agora, Twilio, etc.)
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        callUrl: `https://saludconecta-video.com/call/${appointmentId}`,
        token: 'mock-video-token'
      };
    } catch (error) {
      return { success: false, error: 'Error al inicializar videollamada' };
    }
  }

  static async endCall(appointmentId: string) {
    try {
      console.log('Ending video call:', appointmentId);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al finalizar llamada' };
    }
  }
}

export default {
  AuthService,
  DatabaseService,
  StorageService,
  NotificationService,
  VideoCallService
};