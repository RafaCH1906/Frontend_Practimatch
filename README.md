# PractiMatch Frontend - Dashboard & Landing Page

Este proyecto es una aplicación frontend profesional construida con **React, TypeScript y Vite**, diseñada para gestionar la waitlist de PractiMatch. Incluye una landing page pública premium y un panel administrativo robusto.

## 🚀 Inicio Rápido

### Requisitos Previos
- npm o yarn
- Node.js (v18+)

### Instalación
```bash
# Clonar el repositorio e instalar dependencias
# (Las dependencias ya están listas en este entorno)
npm install
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
# Acceso: http://localhost:5173
```

### Producción
```bash
# Generar build optimizado
npm run build
# Los archivos se generarán en la carpeta /dist
```

## ⚙️ Configuración (.env)

El proyecto utiliza variables de entorno para conectarse al backend. Asegúrate de configurar:

```env
VITE_API_BASE_URL=https://dashboard-practimatch.onrender.com
```

## 🛠️ Arquitectura y Estructura

El proyecto sigue una arquitectura modular y desacoplada:

- **`src/api/`**: Contiene la definición de tipos (`types.ts`) y servicios para interactuar con la API (auth, admin, public).
- **`src/auth/`**: Gestión de autenticación mediante Context API y protección de rutas (`PrivateRoute`).
- **`src/components/`**: Componentes reutilizables organized by domain (common, waitlist).
- **`src/hooks/`**: Lógica de negocio extraída en hooks personalizados (`useWaitlist`, `useMetrics`).
- **`src/pages/`**: Vistas principales de la aplicación.
- **`src/config/`**: Configuración centralizada de Axios e interceptores.

## ✨ Características Principales

### 1. Landing Page Pública (`/`)
- Diseño **Premium Dark Theme** enfocado en conversiones.
- Formulario de registro directo a la waitlist.
- Feedback visual de éxito y validaciones en tiempo real.

### 2. Dashboard Administrativo (`/dashboard`)
- **Métricas UX:** Cards con datos agregados (Total registros, fuentes, países).
- **Gestión de Waitlist:**
  - Tabla performante con **Paginación** real.
  - **Filtros Avanzados:** Por tipo de usuario, fuente, país.
  - **Búsqueda:** Filtro por email en tiempo real.
- **Protección JWT:** Sesión segura con redirección automática en caso de expiración (401).

## 🔒 Seguridad
- Interceptores de Axios para adjuntar automáticamente el token `Bearer`.
- Manejo centralizado de errores de autenticación.
- Rutas privadas que requieren login de administrador.


## 🚀 Deploy Frontend en Render

El proyecto incluye un archivo `render.yaml` que automatiza la configuración del despliegue.

### Pasos para el primer deploy:
1. **Conectar Repositorio:** En el dashboard de Render, selecciona **New > Blueprint**.
2. **Conectar GitHub:** Selecciona el repositorio de este proyecto.
3. **Confirmar Plan:** Render detectará automáticamente el servicio `frontend-practimatch` definido en `render.yaml`.
4. **Deploy:** Haz clic en **Apply**.

### Beneficios del archivo render.yaml:
- **Build Automático:** Ejecuta `npm install && npm run build`.
- **Publish Path:** Sirve automáticamente la carpeta `dist`.
- **SPA Fallback:** Configura automáticamente las reescrituras de rutas para que React Router funcione correctamente (Redirección de `/*` a `/index.html`).
- **Variables de Entorno:** Preconfigura `VITE_API_BASE_URL`.

### Verificación Final
- La página debe cargar el diseño premium.
- El formulario de Waitlist debe enviar datos al backend de Render.
- El Dashboard debe mostrar métricas reales tras el login.

---
*Desarrollado con estándares de Senior Frontend Engineer enfocado en UX y Escalabilidad.*
