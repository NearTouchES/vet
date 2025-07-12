package pe.com.veterinaria.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "citamedica")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CitaMedica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPaciente", nullable = false)
    @JsonBackReference(value = "paciente-citas")
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idMedico", nullable = false)
    @JsonBackReference(value = "medico-citas")
    private Medico medico;

    @Column(name = "motivo", nullable = false, length = 200)
    private String motivo;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;
}