// Este archivo simula la información del doctor autenticado.
// En una aplicación real, estos datos vendrían desde una base de datos.

const doctorCache = {
  id: 1,
  nombres: "Elias",
  apellidos: "Forero",
  correo: "doctor@immunotrack.com",
  password: "123456",
  especialidad: "Inmunología Clínica",
  telefono: "3000000000"
};

// Exporta el objeto para que pueda ser usado por el servicio de autenticación.
module.exports = doctorCache;