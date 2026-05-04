/*
 * Servicio de comunicación HTTP para el módulo de pacientes.
 *
 * Responsabilidad:
 * - Centralizar todas las peticiones del frontend hacia el backend Node/Express.
 * - Exponer funciones reutilizables para listar, buscar, crear, actualizar y eliminar pacientes.
 * - Evitar que los componentes React tengan URLs o lógica de fetch repetida.
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
 * @param {string} termino - Texto digitado por el usuario para filtrar pacientes.
 * @returns {Promise<Array>} Lista de pacientes encontrados.
 */
export async function buscarPacientes(termino) {
  const terminoSeguro = encodeURIComponent(termino || "");

  const respuesta = await fetch(`${API_URL}/buscar?termino=${terminoSeguro}`);
  const datos = await respuesta.json();

  return datos.data;
}

/*
 * Registra un nuevo paciente en la caché del backend.
 *
 * @param {Object} paciente - Datos completos del paciente.
 * @returns {Promise<Object>} Respuesta del backend con el paciente creado.
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
 * Actualiza un paciente existente en la caché del backend.
 *
 * @param {number} id - Identificador del paciente que se desea actualizar.
 * @param {Object} paciente - Nuevos datos del paciente.
 * @returns {Promise<Object>} Respuesta del backend con el paciente actualizado.
 */
export async function actualizarPaciente(id, paciente) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paciente)
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al actualizar paciente.");
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