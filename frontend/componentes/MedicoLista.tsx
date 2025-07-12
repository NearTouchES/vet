"use client";
import { useMedico } from "@/hooks/useMedico";
import MedicoForm from "./MedicoForm";

export default function MedicoLista() {
  const { medicos, loading, error, recargar } = useMedico();

  if (loading) return <p>Cargando médicos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Médicos Registrados</h2>
      <MedicoForm onSuccess={recargar} />
      <ul>
        {medicos.map((medico) => (
          <li key={medico.id}>
            {medico.nombre} - {medico.especialidad} - {medico.dni}
          </li>
        ))}
      </ul>
    </div>
  );
}
