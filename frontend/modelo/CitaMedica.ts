export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
}

export interface Paciente {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
}

export interface CitaMedica {
  id?: number;
  motivo: string;
  fecha: string; // ISO string
  paciente: Paciente;
  medico: Medico;
}
