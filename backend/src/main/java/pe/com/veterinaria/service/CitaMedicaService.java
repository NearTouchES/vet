package pe.com.veterinaria.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.com.veterinaria.modelo.CitaMedica;
import pe.com.veterinaria.repositorio.CitaMedicaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CitaMedicaService {

    private final CitaMedicaRepository citaMedicaRepository;

    public CitaMedicaService(CitaMedicaRepository citaMedicaRepository) {
        this.citaMedicaRepository = citaMedicaRepository;
    }

    public List<CitaMedica> listarTodas() {
        return citaMedicaRepository.findAll();
    }

    public Optional<CitaMedica> obtenerPorId(Long id) {
        return citaMedicaRepository.findById(id);
    }

    public CitaMedica guardar(CitaMedica cita) {
        return citaMedicaRepository.save(cita);
    }

    public void eliminar(Long id) {
        citaMedicaRepository.deleteById(id);
    }

    public List<CitaMedica> listarPorPaciente(Long idPaciente) {
        return citaMedicaRepository.findByPacienteId(idPaciente);
    }

    public List<CitaMedica> listarPorMedico(Long idMedico) {
        return citaMedicaRepository.findByMedicoId(idMedico);
    }

    @Transactional
    public CitaMedica actualizar(Long id, CitaMedica citaActualizada) {
        return citaMedicaRepository.findById(id).map(citaExistente -> {
            citaExistente.setFecha(citaActualizada.getFecha());
            citaExistente.setMotivo(citaActualizada.getMotivo());
            citaExistente.setPaciente(citaActualizada.getPaciente());
            citaExistente.setMedico(citaActualizada.getMedico());
            return citaMedicaRepository.save(citaExistente);
        }).orElseThrow(() -> new RuntimeException("Cita médica no encontrada con id " + id));
    }
}
