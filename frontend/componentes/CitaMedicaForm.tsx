"use client";
import { useState } from "react";
import { CitaMedica } from "@/modelo/CitaMedica";
import { crearCita } from "@/lib/api/citaMedica";

type Props = {
  onSuccess: () => void;
};

export default function CitaMedicaForm({ onSuccess }: Props) {
  const [form, setForm] = useState<Partial<CitaMedica>>({
    motivo: "",
    fecha: "",
    paciente: { id: 1 } as any,
    medico: { id: 1 } as any,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearCita(form as CitaMedica);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="motivo" value={form.motivo} onChange={handleChange} placeholder="Motivo" />
      <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
}
