// Importa los datos simulados del doctor.
const doctorCache = require("../cache/doctor.cache");

// Valida las credenciales del usuario.
function iniciarSesion(correo, password) {
  // Verifica que los campos obligatorios no estén vacíos.
  if (!correo || !password) {
    throw new Error("Correo y contraseña son obligatorios.");
  }

  // Compara los datos enviados con los datos almacenados en caché.
  const credencialesValidas =
    correo === doctorCache.correo && password === doctorCache.password;

  // Si las credenciales no coinciden, se lanza un error.
  if (!credencialesValidas) {
    throw new Error("Credenciales incorrectas.");
  }

  // Se excluye la contraseña antes de enviar la información al frontend.
  const { password: _, ...doctorSinPassword } = doctorCache;

  // Retorna el usuario autenticado y un token simulado.
  return {
    usuario: doctorSinPassword,
    token: "token-academico-cache"
  };
}

// Exporta la función para ser usada por el controlador.
module.exports = {
  iniciarSesion
};