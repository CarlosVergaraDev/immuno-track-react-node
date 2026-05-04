// Importa Express para crear las rutas.
const express = require("express");

// Crea un enrutador específico para autenticación.
const router = express.Router();

// Importa el controlador de autenticación.
const authController = require("../controllers/auth.controller");

// Ruta POST para iniciar sesión.
// Endpoint final: POST /api/auth/login
router.post("/login", authController.login);

// Exporta las rutas para usarlas en app.js.
module.exports = router;