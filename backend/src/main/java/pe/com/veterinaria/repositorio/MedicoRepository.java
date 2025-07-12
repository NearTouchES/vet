package pe.com.veterinaria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.veterinaria.modelo.Medico;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    Medico findByDni(String dni); //tambien puede ser por id, pero por ahora dni
}
