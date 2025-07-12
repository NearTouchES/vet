"use client";
import { usePaciente } from "@/hooks/usePaciente";
import PacienteForm from "./PacienteForm";

export default function PacienteLista() {
  const { pacientes, loading, error, recargar } = usePaciente();

  if (loading) return <p>Cargando pacientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Pacientes Registrados</h2>
      <PacienteForm onSuccess={recargar} />
      <ul>
        {pacientes.map((p) => (
          <li key={p.id}>
            {p.nombre} ({p.especie} - {p.raza}) - Tutor: {p.tutor?.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
