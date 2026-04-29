# TuristMap API 🗺️

API REST para el proyecto TuristMap desarrollada por el equipo TricodeV2M.

## Equipo de desarrollo

| Usuario GitHub | Integrante | Rol |
|---|---|---|
| `ValentinaTangarife` | Valentina Tangarife | Front-end |
| `ValentinaCañon` | Valentina Cañon | Back-end |
| `MichaelBaron` | Michael Baron | Integración / QA |

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- bcryptjs
- JSON Web Token (JWT)
- dotenv

## Instalación

```bash
git clone https://github.com/USUARIO/turistmap-api.git
cd turistmap-api
npm install
cp .env.example .env
npm run dev
```

## Endpoints

| Módulo | Ruta base |
|---|---|
| Autenticación | `/api/auth` |
| Usuarios | `/api/users` |
| Destinos | `/api/destinos` |
| Actividades | `/api/actividades` |
| Itinerarios | `/api/itinerarios` |

## Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación con JWT en header `Authorization: Bearer <token>`
- Control de acceso por roles: `turista` y `administrador`