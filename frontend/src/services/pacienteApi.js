/*
 * Servicio de comunicación con el backend para el módulo de pacientes.
 *
 * Responsabilidad:
 * - Centralizar las operaciones HTTP del CRUD de pacientes.
 * - Conectar React con las rutas de Node/Express.
 * - Mantener separada la lógica de comunicación de la lógica visual.
 */

// URL base del módulo de pacientes en el backend.
const API_URL = "http://localhost:3000/api/pacientes";

/*
 * Consulta todos los pacientes registrados en la caché del backend.
 *
 * @returns {Promise<Array>} Lista de pacientes.
 */
export async function listarPacientes() {
  const respuesta = await fetch(API_URL);
  const datos = await respuesta.json();

  return datos.data;
}

/*
 * Busca pacientes por nombre, apellido o número de documento.
 *
 * @param {string} termino - Texto usado para filtrar pacientes.
 * @returns {Promise<Array>} Lista de pacientes encontrados.
 */
export async function buscarPacientes(termino) {
  const terminoSeguro = encodeURIComponent(termino);

  const respuesta = await fetch(`${API_URL}/buscar?termino=${terminoSeguro}`);
  const datos = await respuesta.json();

  return datos.data;
}

/*
 * Registra un nuevo paciente enviando sus datos al backend.
 *
 * @param {Object} paciente - Datos completos del paciente.
 * @returns {Promise<Object>} Respuesta del backend.
 */
export async function crearPaciente(paciente) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paciente)
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al registrar paciente.");
  }

  return datos;
}

/*
 * Elimina un paciente según su identificador.
 *
 * @param {number} id - Identificador del paciente.
 * @returns {Promise<Object>} Respuesta del backend.
 */
export async function eliminarPaciente(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al eliminar paciente.");
  }

  return datos;
}