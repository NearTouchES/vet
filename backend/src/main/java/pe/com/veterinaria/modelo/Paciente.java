package pe.com.veterinaria.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "paciente")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idTutor", nullable = false)
    private Tutor tutor;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "especie", nullable = false, length = 10)
    private String especie;

    @Column(name = "raza", nullable = false, length = 50)
    private String raza;

    @Column(name = "edad", nullable = false)
    private int edad;

    @Column(name = "estado", nullable = false, length = 50)
    private String estado;
}
