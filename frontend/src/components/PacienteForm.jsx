/*
 * Componente de formulario para registrar pacientes.
 *
 * Responsabilidad:
 * - Capturar los datos administrativos y demográficos del paciente.
 * - Enviar la información al backend mediante pacienteApi.
 * - Notificar al menú principal cuando el paciente fue creado.
 */

import { useState } from "react";
import { crearPaciente } from "../services/pacienteApi";

function PacienteForm({ onPacienteCreado, onCancelar }) {
  /*
   * Estado principal del formulario.
   * Cada propiedad corresponde a un campo del paciente.
   */
  const [formulario, setFormulario] = useState({
    tipoDocumento: "CC",
    numeroDocumento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    genero: "",
    fechaNacimiento: "",
    ciudad: "",
    departamento: "",
    estadoCivil: "",
    ocupacion: "",
    eps: "",
    telefono: "",
    email: ""
  });

  /*
   * Estado usado para mostrar errores de validación enviados por el backend.
   */
  const [error, setError] = useState("");

  /*
   * Actualiza dinámicamente el campo modificado por el usuario.
   *
   * Esta función permite reutilizar un solo manejador para todos los inputs,
   * siempre que cada input tenga definido correctamente su atributo "name".
   */
  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  }

  /*
   * Envía el formulario al backend para registrar el paciente.
   *
   * Si la operación es exitosa, se notifica al componente padre para
   * recargar la lista de pacientes y cerrar el formulario.
   */
  async function manejarSubmit(evento) {
    evento.preventDefault();
    setError("");

    try {
      await crearPaciente(formulario);
      onPacienteCreado();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="panel">
      <h2>Registro de paciente</h2>

      {error && <div className="alert-error">{error}</div>}

      <form className="patient-form" onSubmit={manejarSubmit}>
        <input
          name="tipoDocumento"
          value={formulario.tipoDocumento}
          onChange={manejarCambio}
          placeholder="Tipo documento"
        />

        <input
          name="numeroDocumento"
          value={formulario.numeroDocumento}
          onChange={manejarCambio}
          placeholder="Número documento"
        />

        <input
          name="primerNombre"
          value={formulario.primerNombre}
          onChange={manejarCambio}
          placeholder="Primer nombre"
        />

        <input
          name="segundoNombre"
          value={formulario.segundoNombre}
          onChange={manejarCambio}
          placeholder="Segundo nombre"
        />

        <input
          name="primerApellido"
          value={formulario.primerApellido}
          onChange={manejarCambio}
          placeholder="Primer apellido"
        />

        <input
          name="segundoApellido"
          value={formulario.segundoApellido}
          onChange={manejarCambio}
          placeholder="Segundo apellido"
        />

        <input
          name="genero"
          value={formulario.genero}
          onChange={manejarCambio}
          placeholder="Género"
        />

        <input
          name="fechaNacimiento"
          type="date"
          value={formulario.fechaNacimiento}
          onChange={manejarCambio}
        />

        <input
          name="ciudad"
          value={formulario.ciudad}
          onChange={manejarCambio}
          placeholder="Ciudad"
        />

        <input
          name="departamento"
          value={formulario.departamento}
          onChange={manejarCambio}
          placeholder="Departamento"
        />

        <input
          name="estadoCivil"
          value={formulario.estadoCivil}
          onChange={manejarCambio}
          placeholder="Estado civil"
        />

        <input
          name="ocupacion"
          value={formulario.ocupacion}
          onChange={manejarCambio}
          placeholder="Ocupación"
        />

        <input
          name="eps"
          value={formulario.eps}
          onChange={manejarCambio}
          placeholder="EPS"
        />

        <input
          name="telefono"
          value={formulario.telefono}
          onChange={manejarCambio}
          placeholder="Teléfono"
        />

        <input
          name="email"
          type="email"
          value={formulario.email}
          onChange={manejarCambio}
          placeholder="Correo electrónico"
        />

        <div className="form-actions">
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>

          <button type="submit">
            Guardar paciente
          </button>
        </div>
      </form>
    </section>
  );
}

export default PacienteForm;