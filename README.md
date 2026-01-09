# Practimatch Frontend - Quick Start

Este proyecto es un frontend React + TypeScript + Vite configurado para conectarse al backend FastAPI de Practimatch.

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias (ya instaladas)
npm install

# Desarrollo
npm run dev
# Abre: http://localhost:5173

# Build producción
npm run build
```

## ⚙️ Configuración

Edita `.env.local` con la URL de tu backend:

```bash
VITE_API_URL=http://localhost:8000
```

## 📁 Estructura del Proyecto

```
src/
├── api/          # Servicios API (auth, admin)
├── auth/         # Autenticación (Context, PrivateRoute)
├── components/   # Componentes reutilizables
├── config/       # Configuración (axios, constants)
├── hooks/        # Hooks personalizados
├── layouts/      # Layouts (MainLayout)
├── pages/        # Páginas (Login, Dashboard)
├── App.tsx       # Router principal
└── main.tsx      # Entry point
```

## 🔑 Características Implementadas

- ✅ Login funcional (POST /api/auth/login)
- ✅ Token JWT en localStorage
- ✅ Validación de sesión (GET /api/auth/me)
- ✅ Rutas protegidas con PrivateRoute
- ✅ Dashboard consumiendo GET /api/admin/metrics
- ✅ Interceptores Axios:
  - Auth token automático
  - Logout automático en 401

## 📚 Documentación Completa

Revisa el archivo [walkthrough.md](file:///C:/Users/PC/.gemini/antigravity/brain/6491f3de-c47b-48b0-8aff-5fa9ff3779af/walkthrough.md) para más detalles.
