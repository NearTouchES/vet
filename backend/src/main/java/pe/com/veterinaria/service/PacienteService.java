package pe.com.veterinaria.service;

import org.springframework.stereotype.Service;
import pe.com.veterinaria.modelo.Paciente;
import pe.com.veterinaria.repositorio.PacienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> obtenerPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente guardar(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public void eliminar(Long id) {
        pacienteRepository.deleteById(id);
    }

    public List<Paciente> listarPorTutor(Long idTutor) {
        return pacienteRepository.findByTutorId(idTutor);
    }
}
