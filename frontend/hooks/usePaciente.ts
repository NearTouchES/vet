import { useEffect, useState } from "react";
import { Paciente } from "@/modelo/Paciente";
import { listarPacientes } from "@/lib/api/paciente";

export const usePaciente = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await listarPacientes();
      setPacientes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { pacientes, loading, error, recargar: cargar };
};
