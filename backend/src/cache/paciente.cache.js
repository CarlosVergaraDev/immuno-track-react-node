// Este archivo funciona como una caché en memoria.
// Reemplaza temporalmente el uso de una base de datos.

// Lista inicial de pacientes simulados.
let pacientes = [
  {
    id: 1,
    tipoDocumento: "CC",
    numeroDocumento: "100200300",
    primerNombre: "Pedro",
    segundoNombre: "José",
    primerApellido: "Pérez",
    segundoApellido: "Pirela",
    genero: "Masculino",
    fechaNacimiento: "1990-05-12",
    ciudad: "Barranquilla",
    departamento: "Atlántico",
    estadoCivil: "Soltero",
    ocupacion: "Ingeniero",
    eps: "Sura",
    telefono: "3001234567",
    email: "pedro@email.com"
  }
];

// Variable interna para generar nuevos identificadores.
let siguienteId = 2;

// Retorna todos los pacientes almacenados en caché.
function listarPacientes() {
  return pacientes;
}

// Busca un paciente por su id.
function buscarPacientePorId(id) {
  return pacientes.find((paciente) => paciente.id === Number(id));
}

// Busca pacientes por nombre, apellido o número de documento.
function buscarPacientes(termino) {
  const texto = termino.toLowerCase();

  return pacientes.filter((paciente) => {
    const nombreCompleto = `
      ${paciente.primerNombre}
      ${paciente.segundoNombre}
      ${paciente.primerApellido}
      ${paciente.segundoApellido}
    `.toLowerCase();

    return (
      nombreCompleto.includes(texto) ||
      paciente.numeroDocumento.includes(texto)
    );
  });
}

// Crea un nuevo paciente y lo agrega a la caché.
function crearPaciente(datosPaciente) {
  const nuevoPaciente = {
    id: siguienteId++,
    ...datosPaciente
  };

  pacientes.push(nuevoPaciente);
  return nuevoPaciente;
}

// Actualiza un paciente existente según su id.
function actualizarPaciente(id, datosPaciente) {
  const indice = pacientes.findIndex((paciente) => paciente.id === Number(id));

  if (indice === -1) {
    return null;
  }

  pacientes[indice] = {
    ...pacientes[indice],
    ...datosPaciente,
    id: Number(id)
  };

  return pacientes[indice];
}

// Elimina un paciente de la caché según su id.
function eliminarPaciente(id) {
  const pacienteExiste = pacientes.some((paciente) => paciente.id === Number(id));

  if (!pacienteExiste) {
    return false;
  }

  pacientes = pacientes.filter((paciente) => paciente.id !== Number(id));
  return true;
}

// Exporta todas las funciones de manejo de pacientes.
module.exports = {
  listarPacientes,
  buscarPacientePorId,
  buscarPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
};