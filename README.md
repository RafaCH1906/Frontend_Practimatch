# PractiMatch Frontend - Dashboard & Landing Page

![Practimatch Preview](file:///C:/Users/PC/.gemini/antigravity/brain/288a310c-f370-4bd4-96cb-181c012ba1e8/landing_page_preview.png)

Este proyecto es una aplicación frontend profesional diseñada para gestionar la waitlist de PractiMatch. Incluye una landing page pública premium de alta conversión y un panel administrativo robusto con analíticas avanzadas.

🌍 **App en Producción:** [https://frontend-practimatch.onrender.com](https://frontend-practimatch.onrender.com)

---

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js**: v18 o superior
- **Gestor de paquetes**: npm o yarn

### Instalación Local
```bash
# 1. Clonar repositorio (si aplica) e instalar dependencias
npm install

# 2. Configurar variables de entorno (ver sección ⚙️)
cp .env.example .env.local

# 3. Iniciar servidor de desarrollo
npm run dev
```
Acceso local: `http://localhost:5173`

---

## 🛠️ Stack Tecnológico
- **Core**: React 18 + TypeScript
- **Bundler**: Vite 6
- **Estilos**: Tailwind CSS (Eética Premium & Dark Mode)
- **API**: Axios con interceptores personalizados
- **Routing**: React Router 6
- **Analytics**: Tracking nativo (UTMs, Browser, Device, Geo)

---

## ⚙️ Configuración (.env)

El proyecto utiliza variables de entorno para conectarse al backend. Asegúrate de tener:

```env
VITE_API_BASE_URL=https://dashboard-practimatch.onrender.com
```

---

## 🛠️ Arquitectura
- **`src/api/`**: Definición de tipos y servicios (FastAPI compatible).
- **`src/auth/`**: Gestión de sesión JWT y `PrivateRoute`.
- **`src/utils/tracking.ts`**: Lógica avanzada de analítica y atribución.
- **`src/pages/`**: Vistas modulares (Landing, Login, Dashboard).
- **`render.yaml`**: Infraestructura como código para despliegue automatizado.

---

## ✨ Características Principales

### 1. Landing Page Pública
- Detección automática de **País y Ciudad** (vía ipapi.co).
- Atribución de marketing automática (lectura de **UTMs**).
- Detección de **Navegador y Dispositivo** (Mobile/Tablet/Desktop).

### 2. Dashboard Administrativo
- **Métricas UX:** Visualización de registros agrupados por fuente y país.
- **Seguridad:** Protección de rutas y manejo proactivo de expiración de sesión (401).

---

## 📦 Despliegue en Render

El proyecto está configurado para desplegarse automáticamente mediante el archivo `render.yaml` (Render Blueprint):

1. En Render, selecciona **New > Blueprint**.
2. Conecta este repositorio.
3. Render detectará el servicio `frontend-practimatch` y aplicará la configuración de **Static Site**, incluyendo el **SPA Fallback** (redirección de `/*` a `index.html`).

---
*Desarrollado con estándares de Senior Frontend Engineer enfocado en UX, Escalabilidad y Product Analytics.*
