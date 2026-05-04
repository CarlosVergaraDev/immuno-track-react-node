// Importa Express para crear rutas.
const express = require("express");

// Crea un router específico para pacientes.
const router = express.Router();

// Importa el controlador de pacientes.
const pacienteController = require("../controllers/paciente.controller");

// Ruta para listar todos los pacientes.
// Endpoint final: GET /api/pacientes
router.get("/", pacienteController.listar);

// Ruta para buscar pacientes.
// Endpoint final: GET /api/pacientes/buscar?termino=pedro
router.get("/buscar", pacienteController.buscar);

// Ruta para obtener un paciente por id.
// Endpoint final: GET /api/pacientes/1
router.get("/:id", pacienteController.obtenerPorId);

// Ruta para crear un paciente.
// Endpoint final: POST /api/pacientes
router.post("/", pacienteController.crear);

// Ruta para actualizar un paciente.
// Endpoint final: PUT /api/pacientes/1
router.put("/:id", pacienteController.actualizar);

// Ruta para eliminar un paciente.
// Endpoint final: DELETE /api/pacientes/1
router.delete("/:id", pacienteController.eliminar);

// Exporta las rutas para ser usadas en app.js.
module.exports = router;