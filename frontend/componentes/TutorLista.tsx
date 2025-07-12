"use client";
import { useTutor } from "@/hooks/useTutor";
import TutorForm from "./TutorForm";

export default function TutorLista() {
  const { tutores, loading, error, recargar } = useTutor();

  if (loading) return <p>Cargando tutores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Tutores Registrados</h2>
      <TutorForm onSuccess={recargar} />
      <ul>
        {tutores.map((t) => (
          <li key={t.id}>
            {t.nombre} ({t.dni}) - {t.direccion} - {t.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}
