// Importa la caché de pacientes.
// Esta capa reemplaza temporalmente al DAO de la versión Java.
const pacienteCache = require("../cache/paciente.cache");

// Valida los datos principales del paciente antes de guardarlo.
function validarPaciente(datos) {
  const camposObligatorios = [
    "tipoDocumento",
    "numeroDocumento",
    "primerNombre",
    "primerApellido",
    "genero",
    "fechaNacimiento",
    "ciudad",
    "departamento",
    "eps",
    "telefono",
    "email"
  ];

  // Recorre los campos obligatorios y verifica que tengan contenido.
  for (const campo of camposObligatorios) {
    if (!datos[campo] || datos[campo].toString().trim() === "") {
      throw new Error(`El campo ${campo} es obligatorio.`);
    }
  }

  // Valida formato básico de correo electrónico.
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email);

  if (!emailValido) {
    throw new Error("El correo electrónico no tiene un formato válido.");
  }
}

// Retorna todos los pacientes registrados.
function listarPacientes() {
  return pacienteCache.listarPacientes();
}

// Obtiene un paciente por su id.
function obtenerPacientePorId(id) {
  const paciente = pacienteCache.buscarPacientePorId(id);

  if (!paciente) {
    throw new Error("Paciente no encontrado.");
  }

  return paciente;
}

// Busca pacientes por nombre, apellido o documento.
function buscarPacientes(termino) {
  if (!termino || termino.trim() === "") {
    return pacienteCache.listarPacientes();
  }

  return pacienteCache.buscarPacientes(termino);
}

// Crea un nuevo paciente después de validar sus datos.
function crearPaciente(datos) {
  validarPaciente(datos);
  return pacienteCache.crearPaciente(datos);
}

// Actualiza un paciente existente.
function actualizarPaciente(id, datos) {
  validarPaciente(datos);

  const pacienteActualizado = pacienteCache.actualizarPaciente(id, datos);

  if (!pacienteActualizado) {
    throw new Error("Paciente no encontrado.");
  }

  return pacienteActualizado;
}

// Elimina un paciente por id.
function eliminarPaciente(id) {
  const eliminado = pacienteCache.eliminarPaciente(id);

  if (!eliminado) {
    throw new Error("Paciente no encontrado.");
  }

  return true;
}

// Exporta las funciones de servicio.
module.exports = {
  listarPacientes,
  obtenerPacientePorId,
  buscarPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
};