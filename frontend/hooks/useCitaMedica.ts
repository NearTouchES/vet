import { useState, useEffect } from "react";
import { CitaMedica } from "@/modelo/CitaMedica";
import { listarCitas } from "@/lib/api/citaMedica";

export const useCitaMedica = () => {
  const [citas, setCitas] = useState<CitaMedica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarCitas = async () => {
    try {
      setLoading(true);
      const data = await listarCitas();
      setCitas(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar citas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  return { citas, loading, error, recargar: cargarCitas };
};
