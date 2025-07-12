import { useState, useEffect } from "react";
import { Medico } from "@/modelo/Medico";
import { listarMedicos } from "@/lib/api/medico";

export const useMedico = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await listarMedicos();
      setMedicos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { medicos, loading, error, recargar: cargar };
};
