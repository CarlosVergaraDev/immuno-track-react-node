# ImmunoTrack React + Node.js

Academic clinical management system developed with React and Node.js.  
Sistema clínico académico desarrollado con React y Node.js.

---

## Español

### Descripción

ImmunoTrack es una aplicación web académica orientada a la gestión básica de pacientes clínicos. Esta versión fue desarrollada con React para el frontend y Node.js con Express para el backend.

El sistema permite realizar operaciones CRUD sobre pacientes, usando una caché en memoria como mecanismo temporal de persistencia. No utiliza base de datos, ya que el objetivo del proyecto es demostrar la conexión entre frontend y backend mediante endpoints HTTP.

---

### Tecnologías utilizadas

- React
- Vite
- JavaScript
- Node.js
- Express
- CORS
- HTML
- CSS
- Caché en memoria

---

### Funcionalidades principales

- Inicio de sesión simulado para doctor.
- Visualización del menú clínico principal.
- Listado de pacientes.
- Búsqueda de pacientes.
- Registro de pacientes.
- Edición de pacientes.
- Eliminación de pacientes.
- Visualización de información general del paciente.
- Comunicación real entre React y Node.js mediante API REST.
- Persistencia temporal usando caché en memoria.

---

### Alcance académico

Esta versión fue desarrollada con fines académicos. La información no se almacena en una base de datos, sino en memoria mientras el servidor backend permanece activo.

Cuando el servidor Node.js se reinicia, los datos registrados durante la ejecución se pierden, excepto los datos iniciales definidos en la caché.

---

### Funcionalidades no implementadas en esta versión

Las siguientes funcionalidades quedan fuera del alcance actual:

- Recuperación de contraseña.
- Registro completo de usuario doctor.
- Historia médica funcional.
- Módulo de medicamentos funcional.
- Módulo de control médico funcional.
- Persistencia en base de datos.
- Autenticación real con JWT o sesiones seguras.

---

### Estructura general del proyecto

```txt
immuno-track-node/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── cache/
│   │   │   ├── doctor.cache.js
│   │   │   └── paciente.cache.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── paciente.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── paciente.routes.js
│   │   └── services/
│   │       ├── auth.service.js
│   │       └── paciente.service.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   └── PacienteForm.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── MenuPage.jsx
│   │   ├── services/
│   │   │   ├── authApi.js
│   │   │   └── pacienteApi.js
│   │   └── styles/
│   │       └── app.css
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

### Instalación y ejecución

#### 1. Clonar el repositorio

```bash
git clone git@github.com:CarlosVergaraDev/immuno-track-node.git
```

```bash
cd immuno-track-node
```

---

#### 2. Instalar y ejecutar el backend

```bash
cd backend
npm install
npm run dev
```

El backend se ejecuta en:

```txt
http://localhost:3000
```

Ruta de prueba:

```txt
http://localhost:3000/api/health
```

---

#### 3. Instalar y ejecutar el frontend

Abrir otra terminal desde la raíz del proyecto:

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecuta en:

```txt
http://localhost:5173
```

---

### Credenciales de prueba

```txt
Correo: doctor@immunotrack.com
Contraseña: 123456
```

---

### Endpoints principales del backend

#### Autenticación

```txt
POST /api/auth/login
```

#### Pacientes

```txt
GET    /api/pacientes
GET    /api/pacientes/buscar?termino=valor
GET    /api/pacientes/:id
POST   /api/pacientes
PUT    /api/pacientes/:id
DELETE /api/pacientes/:id
```

---

### Flujo de funcionamiento

```txt
React Frontend
      ↓
Servicios API con fetch
      ↓
Backend Node.js + Express
      ↓
Servicios de negocio
      ↓
Caché en memoria
      ↓
Respuesta JSON al frontend
```

---

### Arquitectura aplicada

El proyecto mantiene una separación básica por capas:

```txt
Routes → Controllers → Services → Cache
```

#### Routes

Definen las rutas HTTP disponibles para el frontend.

#### Controllers

Reciben las peticiones, procesan la entrada y devuelven respuestas HTTP.

#### Services

Contienen la lógica de negocio y validaciones principales.

#### Cache

Simula una capa de persistencia en memoria, reemplazando temporalmente una base de datos.

---

### Nota académica

Este proyecto fue desarrollado como una adaptación académica de un sistema clínico hacia una arquitectura moderna basada en React y Node.js. La base de datos fue reemplazada por caché en memoria para cumplir con el alcance definido del ejercicio.

---

## English

### Description

ImmunoTrack is an academic web application focused on basic clinical patient management. This version was developed using React for the frontend and Node.js with Express for the backend.

The system allows CRUD operations for patients using an in-memory cache as a temporary persistence mechanism. It does not use a database, since the main objective is to demonstrate the connection between frontend and backend through HTTP endpoints.

---

### Technologies Used

- React
- Vite
- JavaScript
- Node.js
- Express
- CORS
- HTML
- CSS
- In-memory cache

---

### Main Features

- Simulated doctor login.
- Clinical dashboard view.
- Patient listing.
- Patient search.
- Patient registration.
- Patient editing.
- Patient deletion.
- General patient information view.
- Real communication between React and Node.js through a REST API.
- Temporary persistence using in-memory cache.

---

### Academic Scope

This version was developed for academic purposes. The information is not stored in a database; it is stored in memory while the backend server is running.

When the Node.js server restarts, the data registered during execution is lost, except for the initial data defined in the cache.

---

### Features Not Implemented in This Version

The following features are outside the current scope:

- Password recovery.
- Full doctor registration.
- Functional medical history module.
- Functional medication module.
- Functional medical control module.
- Database persistence.
- Real authentication with JWT or secure sessions.

---

### Project Structure

```txt
immuno-track-node/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── cache/
│   │   │   ├── doctor.cache.js
│   │   │   └── paciente.cache.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── paciente.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── paciente.routes.js
│   │   └── services/
│   │       ├── auth.service.js
│   │       └── paciente.service.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   └── PacienteForm.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── MenuPage.jsx
│   │   ├── services/
│   │   │   ├── authApi.js
│   │   │   └── pacienteApi.js
│   │   └── styles/
│   │       └── app.css
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

### Installation and Execution

#### 1. Clone the Repository

```bash
git clone git@github.com:CarlosVergaraDev/immuno-track-node.git
```

```bash
cd immuno-track-node
```

---

#### 2. Install and Run the Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs at:

```txt
http://localhost:3000
```

Health check route:

```txt
http://localhost:3000/api/health
```

---

#### 3. Install and Run the Frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```txt
http://localhost:5173
```

---

### Test Credentials

```txt
Email: doctor@immunotrack.com
Password: 123456
```

---

### Main Backend Endpoints

#### Authentication

```txt
POST /api/auth/login
```

#### Patients

```txt
GET    /api/pacientes
GET    /api/pacientes/buscar?termino=value
GET    /api/pacientes/:id
POST   /api/pacientes
PUT    /api/pacientes/:id
DELETE /api/pacientes/:id
```

---

### Application Flow

```txt
React Frontend
      ↓
API services with fetch
      ↓
Node.js + Express Backend
      ↓
Business services
      ↓
In-memory cache
      ↓
JSON response to frontend
```

---

### Applied Architecture

The project follows a basic layered structure:

```txt
Routes → Controllers → Services → Cache
```

#### Routes

Define the HTTP routes available to the frontend.

#### Controllers

Receive requests, process input, and return HTTP responses.

#### Services

Contain the main business logic and validations.

#### Cache

Simulates a persistence layer in memory, temporarily replacing a database.

---

### Academic Note

This project was developed as an academic adaptation of a clinical system into a modern architecture based on React and Node.js. The database was replaced with in-memory cache according to the defined scope of the exercise.

---