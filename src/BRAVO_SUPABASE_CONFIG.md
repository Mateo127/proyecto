# 🚀 Configuración Supabase para Bravo Studio - SaludConecta

## 📊 1. Configuración de Base de Datos Supabase

### Tabla: `appointments`
```sql
-- Crear tabla de citas médicas
CREATE TABLE appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    doctor VARCHAR(255) NOT NULL,
    estado VARCHAR(50) DEFAULT 'programada' CHECK (estado IN ('programada', 'cancelada', 'completada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propias citas
CREATE POLICY "Users can view own appointments" ON appointments
    FOR SELECT USING (auth.uid() = user_id);

-- Política: Los usuarios solo pueden insertar sus propias citas
CREATE POLICY "Users can insert own appointments" ON appointments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios solo pueden actualizar sus propias citas
CREATE POLICY "Users can update own appointments" ON appointments
    FOR UPDATE USING (auth.uid() = user_id);

-- Índices para mejor performance
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_fecha ON appointments(fecha);
```

### Tabla: `profiles` (extender datos de usuario)
```sql
-- Crear tabla de perfiles de usuario
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, nombre)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'nombre');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 🔧 2. API Collections en Bravo Studio

### Collection 1: Authentication

#### 🔐 REGISTRO DE USUARIO
- **Endpoint:** `https://[TU-PROJECT-ID].supabase.co/auth/v1/signup`
- **Método:** `POST`
- **Headers:**
```json
{
  "apikey": "[TU-SUPABASE-ANON-KEY]",
  "Content-Type": "application/json"
}
```
- **Body (JSON):**
```json
{
  "email": "{{email}}",
  "password": "{{password}}",
  "data": {
    "nombre": "{{nombre}}"
  }
}
```
- **Mapeo de Campos:**
  - Input `email` → `email`
  - Input `password` → `password`  
  - Input `nombre` → `data.nombre`

#### 🔑 LOGIN DE USUARIO
- **Endpoint:** `https://[TU-PROJECT-ID].supabase.co/auth/v1/token?grant_type=password`
- **Método:** `POST`
- **Headers:**
```json
{
  "apikey": "[TU-SUPABASE-ANON-KEY]",
  "Content-Type": "application/json"
}
```
- **Body (JSON):**
```json
{
  "email": "{{email}}",
  "password": "{{password}}"
}
```
- **Mapeo de Campos:**
  - Input `email` → `email`
  - Input `password` → `password`
- **Response mapping:**
  - `access_token` → Guardar en variable global para autenticación
  - `user.email` → Mostrar email del usuario
  - `user.user_metadata.nombre` → Mostrar nombre del usuario

### Collection 2: User Profile

#### 👤 OBTENER PERFIL DE USUARIO
- **Endpoint:** `https://[TU-PROJECT-ID].supabase.co/rest/v1/profiles?select=*`
- **Método:** `GET`
- **Headers:**
```json
{
  "apikey": "[TU-SUPABASE-ANON-KEY]",
  "Authorization": "Bearer {{access_token}}",
  "Content-Type": "application/json"
}
```
- **Response mapping:**
  - `[0].nombre` → Mostrar en Dashboard
  - `[0].telefono` → Mostrar teléfono
  - `[0].fecha_nacimiento` → Mostrar fecha nacimiento

### Collection 3: Appointments

#### 📅 LISTAR CITAS DEL USUARIO
- **Endpoint:** `https://[TU-PROJECT-ID].supabase.co/rest/v1/appointments?select=*&order=fecha.desc,hora.desc`
- **Método:** `GET`
- **Headers:**
```json
{
  "apikey": "[TU-SUPABASE-ANON-KEY]",
  "Authorization": "Bearer {{access_token}}",
  "Content-Type": "application/json"
}
```
- **Response mapping para Lista:**
  - `fecha` → Mostrar fecha de cita
  - `hora` → Mostrar hora de cita
  - `doctor` → Mostrar nombre del doctor
  - `estado` → Mostrar estado (badge de color)
  - `id` → ID para acciones de cancelar

#### ➕ CREAR NUEVA CITA
- **Endpoint:** `https://[TU-PROJECT-ID].supabase.co/rest/v1/appointments`
- **Método:** `POST`
- **Headers:**
```json
{
  "apikey": "[TU-SUPABASE-ANON-KEY]",
  "Authorization": "Bearer {{access_token}}",
  "Content-Type": "application/json",
  "Prefer": "return=representation"
}
```
- **Body (JSON):**
```json
{
  "fecha": "{{fecha}}",
  "hora": "{{hora}}",
  "doctor": "{{doctor}}",
  "estado": "programada"
}
```
- **Mapeo de Campos:**
  - Input `fecha` → `fecha` (formato: YYYY-MM-DD)
  - Input `hora` → `hora` (formato: HH:MM:SS)
  - Input `doctor` → `doctor`

#### ❌ CANCELAR CITA
- **Endpoint:** `https://[TU-PROJECT-ID].supabase.co/rest/v1/appointments?id=eq.{{appointment_id}}`
- **Método:** `PATCH`
- **Headers:**
```json
{
  "apikey": "[TU-SUPABASE-ANON-KEY]",
  "Authorization": "Bearer {{access_token}}",
  "Content-Type": "application/json"
}
```
- **Body (JSON):**
```json
{
  "estado": "cancelada"
}
```
- **Mapeo de Campos:**
  - Button `appointment_id` → URL parameter

## 🎯 3. Configuración de Pantallas en Bravo

### Pantalla: Login
**API Collection:** Authentication → Login
**Triggers:**
- Button "Iniciar Sesión" → Ejecutar API Login
- Success → Navegar a Dashboard
- Error → Mostrar mensaje de error

**Variables a guardar:**
- `access_token` (Global)
- `user_email` (Global)
- `user_nombre` (Global)

### Pantalla: Registro
**API Collection:** Authentication → Registro
**Triggers:**
- Button "Registrarse" → Ejecutar API Registro
- Success → Navegar a Login
- Error → Mostrar mensaje de error

### Pantalla: Dashboard
**API Collections:**
1. User Profile → Obtener Perfil (Auto-execute on load)
2. Appointments → Listar Citas (Auto-execute on load)

**Data Display:**
- Texto "Hola, {{user_nombre}}" usando variable global
- Lista de próximas citas (máximo 3)

### Pantalla: Citas Médicas
**API Collection:** Appointments → Listar Citas (Auto-execute on load)

**Lista Components:**
- **Repeat Component** conectado a API response
- **Template:** Card con fecha, hora, doctor, estado
- **Button "Cancelar"** → Ejecutar API Cancelar Cita

**Button "Nueva Cita":**
- Navegar a formulario de nueva cita

### Pantalla: Nueva Cita (Formulario)
**Form Inputs:**
- Date Picker para `fecha`
- Time Picker para `hora`
- Text Input para `doctor`

**API Collection:** Appointments → Crear Nueva Cita
**Triggers:**
- Button "Guardar Cita" → Ejecutar API
- Success → Navegar de vuelta a lista de citas
- Error → Mostrar mensaje

## 🔒 4. Configuración de Seguridad

### Variables Globales Requeridas
```
SUPABASE_URL = https://[TU-PROJECT-ID].supabase.co
SUPABASE_ANON_KEY = [TU-ANON-KEY]
```

### Headers de Autenticación
**Para endpoints públicos (signup, login):**
```json
{
  "apikey": "{{SUPABASE_ANON_KEY}}"
}
```

**Para endpoints protegidos (appointments, profiles):**
```json
{
  "apikey": "{{SUPABASE_ANON_KEY}}",
  "Authorization": "Bearer {{access_token}}"
}
```

## 📱 5. Ejemplos de Response Data

### Login Success Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "usuario@ejemplo.com",
    "user_metadata": {
      "nombre": "Juan Pérez"
    }
  }
}
```

### Appointments List Response:
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "fecha": "2025-01-15",
    "hora": "10:30:00",
    "doctor": "Dr. Carlos Ruiz",
    "estado": "programada",
    "created_at": "2025-01-01T10:00:00Z"
  },
  {
    "id": "123e4567-e89b-12d3-a456-426614174002",
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "fecha": "2025-01-18",
    "hora": "15:00:00",
    "doctor": "Dra. Ana Martín",
    "estado": "programada",
    "created_at": "2025-01-01T11:00:00Z"
  }
]
```

## 🎨 6. Mapeo de Estados en UI

### Estado de Citas - Badges de Color:
```
"programada" → Badge verde (#10b981)
"cancelada" → Badge rojo (#ef4444)  
"completada" → Badge azul (#2563eb)
```

### Formato de Fechas:
```
Database: "2025-01-15" 
Display: "15 de Enero, 2025"

Database: "10:30:00"
Display: "10:30 AM"
```

## ⚡ 7. Actions & Navigation Flow

### Flujo de Navegación:
1. **Splash** → **Login**
2. **Login** → **Dashboard** (success) / **Registro** (link)
3. **Registro** → **Login** (success)
4. **Dashboard** → **Citas** (button) / **Perfil** (button)
5. **Citas** → **Nueva Cita** (button)
6. **Nueva Cita** → **Citas** (success)

### Actions on Buttons:
- **Login Button:** Execute Login API + Save tokens + Navigate to Dashboard
- **Register Button:** Execute Signup API + Navigate to Login  
- **Nueva Cita Button:** Navigate to form
- **Guardar Cita Button:** Execute Create API + Navigate back
- **Cancelar Button:** Execute Cancel API + Refresh list

## 🧪 8. Testing en Bravo Vision

### Datos de Prueba:
**Usuario de prueba:**
```
Email: test@saludconecta.com
Password: Test123456
Nombre: Usuario Demo
```

**Citas de prueba:**
```
Cita 1:
- Fecha: 2025-01-15
- Hora: 10:30
- Doctor: Dr. Carlos Ruiz

Cita 2:
- Fecha: 2025-01-18  
- Hora: 15:00
- Doctor: Dra. Ana Martín
```

### Validaciones a Verificar:
✅ Login con credenciales correctas
✅ Registro de nuevo usuario
✅ Dashboard muestra nombre del usuario
✅ Lista de citas carga correctamente
✅ Crear nueva cita funciona
✅ Cancelar cita cambia estado
✅ Solo se muestran citas del usuario logueado
✅ Headers de autenticación funcionan
✅ Navegación entre pantallas

---

## 📞 Soporte

Si tienes problemas con la configuración, verifica:
1. **URL de Supabase** está correcta
2. **API Keys** están bien configuradas
3. **RLS Policies** están habilitadas
4. **Headers de autenticación** incluyen el token
5. **Mapeo de campos** coincide con la estructura JSON

¡Tu app SaludConecta estará lista para pruebas completas en Bravo Vision! 🏥✨