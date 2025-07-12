import { useEffect, useState } from "react";
import { Tutor } from "@/modelo/Tutor";
import { listarTutores } from "@/lib/api/tutor";

export const useTutor = () => {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await listarTutores();
      setTutores(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { tutores, loading, error, recargar: cargar };
};
