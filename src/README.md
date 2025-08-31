# SaludConecta 🏥

Aplicación de telemedicina moderna que conecta pacientes y profesionales de la salud a través de consultas virtuales, seguimiento médico y recursos educativos.

## 🌟 Características

- **Consultas Virtuales**: Videollamadas HD con profesionales de la salud
- **Chat en Tiempo Real**: Comunicación instantánea estilo WhatsApp
- **Calendario Inteligente**: Gestión de citas y recordatorios
- **Recursos Educativos**: Contenido médico verificado
- **Perfil Personalizado**: Historial médico y configuraciones
- **Diseño Responsivo**: Optimizado para móvil y web

## 🚀 Deploy en Netlify

### Método 1: Deploy Automático desde Git

1. **Fork o clona este repositorio**
2. **Conecta tu repositorio a Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Click en "New site from Git"
   - Conecta tu repositorio de GitHub/GitLab
   - Configura los ajustes de build:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Node version**: `18`

### Método 2: Deploy Manual

1. **Construye el proyecto localmente:**
   ```bash
   # Instalar dependencias
   npm install
   
   # Construir para producción
   npm run build
   ```

2. **Sube la carpeta `dist` a Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Arrastra la carpeta `dist` al área de deploy

### Configuración de Variables de Entorno

Para habilitar Firebase, agrega estas variables en Netlify:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 Tecnologías

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Firebase (Auth, Firestore, Storage)
- **UI Components**: Radix UI + Shadcn/ui
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Build Tool**: Vite
- **Deploy**: Netlify

## 🎨 Diseño

- **Paleta de Colores**: Azul primario (#2563EB), Verde acento (#10B981)
- **Tipografía**: Inter font family
- **Componentes**: Sistema de diseño modular inspirado en Duolingo y Notion
- **Responsive**: Mobile-first design

## 📄 Estructura del Proyecto

```
saludconecta/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── favicon.svg           # Favicon
├── src/
│   └── main.tsx             # Punto de entrada
├── components/
│   ├── screens/             # Pantallas principales
│   ├── ui/                  # Componentes UI (Shadcn)
│   └── ...                  # Otros componentes
├── services/
│   ├── firebase.ts          # Configuración Firebase
│   └── useAuth.ts          # Hook de autenticación
├── styles/
│   └── globals.css         # Estilos globales Tailwind
├── App.tsx                 # Componente principal
├── vite.config.ts         # Configuración Vite
├── netlify.toml           # Configuración Netlify
└── package.json           # Dependencias
```

## 🔐 Funcionalidades Implementadas

- ✅ 12 pantallas completas (Splash, Onboarding, Auth, Dashboard, etc.)
- ✅ Autenticación con Firebase
- ✅ Chat en tiempo real
- ✅ Videollamadas WebRTC
- ✅ Calendario de citas
- ✅ Gestión de perfil
- ✅ Recursos educativos
- ✅ Configuraciones
- ✅ Responsive design
- ✅ PWA ready

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo.

---

**SaludConecta** - Conectando la salud del futuro 🏥💙