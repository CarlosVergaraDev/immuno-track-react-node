// Importa el servicio de pacientes.
const pacienteService = require("../services/paciente.service");

// Controlador para listar todos los pacientes.
function listar(req, res) {
  const pacientes = pacienteService.listarPacientes();

  res.json({
    ok: true,
    data: pacientes
  });
}

// Controlador para buscar pacientes usando un término enviado por query param.
function buscar(req, res) {
  const { termino } = req.query;

  const pacientes = pacienteService.buscarPacientes(termino);

  res.json({
    ok: true,
    data: pacientes
  });
}

// Controlador para obtener un paciente específico por id.
function obtenerPorId(req, res) {
  try {
    const paciente = pacienteService.obtenerPacientePorId(req.params.id);

    res.json({
      ok: true,
      data: paciente
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      mensaje: error.message
    });
  }
}

// Controlador para crear un nuevo paciente.
function crear(req, res) {
  try {
    const nuevoPaciente = pacienteService.crearPaciente(req.body);

    res.status(201).json({
      ok: true,
      mensaje: "Paciente registrado correctamente.",
      data: nuevoPaciente
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }
}

// Controlador para actualizar un paciente existente.
function actualizar(req, res) {
  try {
    const pacienteActualizado = pacienteService.actualizarPaciente(
      req.params.id,
      req.body
    );

    res.json({
      ok: true,
      mensaje: "Paciente actualizado correctamente.",
      data: pacienteActualizado
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }
}

// Controlador para eliminar un paciente.
function eliminar(req, res) {
  try {
    pacienteService.eliminarPaciente(req.params.id);

    res.json({
      ok: true,
      mensaje: "Paciente eliminado correctamente."
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      mensaje: error.message
    });
  }
}

// Exporta todos los controladores del módulo de pacientes.
module.exports = {
  listar,
  buscar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};