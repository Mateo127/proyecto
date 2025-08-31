# 🔥 Configuración de Firebase para SaludConecta

Esta guía te ayudará a configurar Firebase para tu aplicación de telemedicina SaludConecta con todas las funcionalidades avanzadas.

## 📋 Servicios Firebase Requeridos

- **Authentication** - Autenticación de usuarios
- **Firestore Database** - Base de datos en tiempo real
- **Cloud Storage** - Almacenamiento de archivos
- **Cloud Functions** - Lógica del servidor
- **Cloud Messaging** - Notificaciones push
- **Hosting** - Deploy de la aplicación

## 🚀 Configuración Paso a Paso

### 1. Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "saludconecta-app"
3. Habilita Google Analytics (opcional)

### 2. Configurar Authentication

```bash
# Habilita los métodos de autenticación:
- Email/Password
- Google OAuth (opcional)
```

### 3. Configurar Firestore Database

```javascript
// Reglas de seguridad básicas
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Citas médicas
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
    
    // Mensajes de chat
    match /chats/{chatId}/messages/{messageId} {
      allow read, write: if request.auth != null;
    }
    
    // Recursos médicos (solo lectura)
    match /medical_resources/{resourceId} {
      allow read: if request.auth != null;
    }
  }
}
```

### 4. Configurar Cloud Storage

```javascript
// Reglas de seguridad para Storage
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Perfiles de usuario
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Documentos médicos
    match /medical_documents/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Instalar Firebase SDK

```bash
npm install firebase
```

### 6. Configurar Variables de Entorno

Crea un archivo `.env.local`:

```env
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=saludconecta-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=saludconecta-app
VITE_FIREBASE_STORAGE_BUCKET=saludconecta-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 7. Actualizar Configuración Firebase

Reemplaza el contenido de `/services/firebase.ts`:

```javascript
// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 📊 Estructura de Datos Firestore

### Colección `users`
```javascript
{
  id: "user123",
  email: "usuario@example.com",
  name: "Juan Pérez",
  avatar: "https://...",
  phone: "+34 666 123 456",
  birthDate: "1990-05-15",
  medicalHistory: ["Hipertensión", "Diabetes"],
  emergencyContact: {
    name: "María Pérez",
    phone: "+34 666 654 321"
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Colección `appointments`
```javascript
{
  id: "appt123",
  patientId: "user123",
  doctorId: "dr456",
  doctorName: "Dr. Carlos Ruiz",
  date: "2025-09-05",
  time: "10:00",
  type: "video", // video, chat, in-person
  status: "scheduled", // scheduled, completed, cancelled
  notes: "Consulta de seguimiento",
  createdAt: timestamp
}
```

### Colección `chats/{chatId}/messages`
```javascript
{
  id: "msg123",
  senderId: "user123",
  senderName: "Juan Pérez",
  message: "Hola doctor, ¿cómo está?",
  type: "text", // text, image, file
  timestamp: timestamp,
  read: false
}
```

## 🔔 Cloud Functions para Funcionalidades Avanzadas

### Función para Videollamadas
```javascript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const generateVideoCallToken = functions.https.onCall(async (data, context) => {
  // Lógica para generar token de videollamada
  // Integración con servicio de video (Agora, Twilio, etc.)
});

export const scheduleAppointmentReminder = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate(async (snap, context) => {
    // Programar recordatorio de cita
    const appointment = snap.data();
    
    // Enviar notificación push
    await admin.messaging().send({
      token: appointment.patientFCMToken,
      notification: {
        title: 'Cita programada',
        body: `Tu cita con ${appointment.doctorName} es ${appointment.date} a las ${appointment.time}`
      }
    });
  });
```

## 📱 Configurar Notificaciones Push

### 1. Generar Certificado FCM
- Ve a Project Settings > Cloud Messaging
- Genera una nueva clave de servidor

### 2. Configurar Service Worker
```javascript
// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  // Tu configuración Firebase
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

## 🏥 Consideraciones de Seguridad para Telemedicina

### Cumplimiento HIPAA/GDPR
- **Cifrado**: Todos los datos deben estar cifrados en tránsito y reposo
- **Acceso**: Implementar control de acceso basado en roles
- **Auditoría**: Logs de todas las operaciones médicas
- **Retención**: Políticas de retención de datos médicos

### Validación de Datos
```javascript
// Validación de datos médicos en Cloud Functions
export const validateMedicalData = functions.firestore
  .document('medical_records/{recordId}')
  .onWrite(async (change, context) => {
    // Validar formato y contenido de datos médicos
    // Aplicar reglas de negocio específicas
  });
```

## 🚀 Deploy

### 1. Build y Deploy
```bash
# Build de la aplicación
npm run build

# Deploy a Firebase Hosting
firebase deploy --only hosting

# Deploy Cloud Functions
firebase deploy --only functions
```

### 2. Configurar Dominio Personalizado
- Ve a Firebase Console > Hosting
- Agrega tu dominio personalizado
- Configura SSL automático

## 📞 Integración de Videollamadas

### Opciones Recomendadas:
1. **Agora.io** - SDK robusto para WebRTC
2. **Twilio Video** - Fácil integración
3. **Jitsi Meet** - Código abierto

### Configuración básica con Agora:
```bash
npm install agora-rtc-sdk-ng
```

```javascript
// services/videoCall.ts
import AgoraRTC from 'agora-rtc-sdk-ng';

export class VideoCallService {
  static async initializeCall(appointmentId: string) {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    
    // Obtener token desde Cloud Function
    const tokenResponse = await fetch('/api/generateVideoToken', {
      method: 'POST',
      body: JSON.stringify({ appointmentId })
    });
    
    const { token, channel } = await tokenResponse.json();
    
    await client.join(process.env.VITE_AGORA_APP_ID, channel, token);
    
    return client;
  }
}
```

## 🔧 Testing

### Tests de Seguridad
```bash
# Testing de reglas Firestore
npm install -g @firebase/rules-unit-testing
firebase emulators:start --only firestore
npm test
```

### Tests de Cloud Functions
```bash
# Testing de funciones
cd functions
npm run test
```

## 🌐 Variables de Entorno Completas

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Videollamadas (Agora)
VITE_AGORA_APP_ID=
VITE_AGORA_APP_CERTIFICATE=

# Notificaciones
VITE_FCM_VAPID_KEY=

# APIs Médicas (opcional)
VITE_MEDICAL_API_KEY=
```

## 📚 Recursos Adicionales

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [WebRTC Guide](https://webrtc.org/getting-started/)

---

¡Tu aplicación SaludConecta estará lista para producción con todas las funcionalidades avanzadas de telemedicina! 🏥✨