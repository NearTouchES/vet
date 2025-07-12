package pe.com.veterinaria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.veterinaria.modelo.CitaMedica;

import java.util.List;

@Repository
public interface CitaMedicaRepository extends JpaRepository<CitaMedica, Long> {

    List<CitaMedica> findByPacienteId(Long idPaciente);

    List<CitaMedica> findByMedicoId(Long idMedico);

    List<CitaMedica> findByFecha(java.time.LocalDate fecha);

    // Puedes agregar más métodos según tu necesidad
}