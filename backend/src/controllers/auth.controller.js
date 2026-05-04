// Importa el servicio que contiene la lógica de autenticación.
const authService = require("../services/auth.service");

// Controlador encargado de procesar el inicio de sesión.
function login(req, res) {
  try {
    // Obtiene correo y contraseña desde el cuerpo de la petición.
    const { correo, password } = req.body;

    // Envía los datos al servicio para validar las credenciales.
    const resultado = authService.iniciarSesion(correo, password);

    // Responde al frontend con la información del usuario autenticado.
    res.json({
      ok: true,
      mensaje: "Inicio de sesión correcto.",
      data: resultado
    });
  } catch (error) {
    // Si ocurre un error, se responde con estado 400.
    res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }
}

// Exporta el controlador.
module.exports = {
  login
};