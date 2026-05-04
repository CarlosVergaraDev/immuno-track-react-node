/*
 * Servicio de comunicación con el backend para autenticación.
 *
 * Responsabilidad:
 * - Centralizar las peticiones HTTP relacionadas con el login.
 * - Evitar que los componentes React llamen directamente al backend.
 */

// URL base del módulo de autenticación en el backend Node/Express.
const API_URL = "http://localhost:3000/api/auth";

/*
 * Envía las credenciales del doctor al backend.
 *
 * @param {Object} credenciales - Objeto con correo y password.
 * @returns {Promise<Object>} Respuesta del backend con usuario y token simulado.
 */
export async function loginDoctor(credenciales) {
  const respuesta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credenciales)
  });

  const datos = await respuesta.json();

  /*
   * Si el backend responde con error, se lanza una excepción
   * para que el componente pueda mostrar el mensaje al usuario.
   */
  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al iniciar sesión.");
  }

  return datos;
}