export interface Tutor {
  id: number;
  nombre: string;
  dni: string;
  direccion: string;
  telefono: string;
}

export interface Paciente {
  id?: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
  tutor: Tutor;
}
