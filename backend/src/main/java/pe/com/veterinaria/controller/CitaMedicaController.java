package pe.com.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.veterinaria.modelo.CitaMedica;
import pe.com.veterinaria.service.CitaMedicaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/citas")
public class CitaMedicaController {

    private final CitaMedicaService citaMedicaService;

    public CitaMedicaController(CitaMedicaService citaMedicaService) {
        this.citaMedicaService = citaMedicaService;
    }

    @GetMapping
    public List<CitaMedica> listar() {
        return citaMedicaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaMedica> obtenerPorId(@PathVariable Long id) {
        Optional<CitaMedica> cita = citaMedicaService.obtenerPorId(id);
        return cita.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CitaMedica> crear(@RequestBody CitaMedica cita) {
        CitaMedica nuevaCita = citaMedicaService.guardar(cita);
        return ResponseEntity.ok(nuevaCita);
    }
    //En caso de fallar el put, debo revisar ejemplo del profesor.
    @PutMapping("/{id}")
    public ResponseEntity<CitaMedica> actualizar(@PathVariable Long id, @RequestBody CitaMedica citaActualizada) {
        Optional<CitaMedica> citaExistente = citaMedicaService.obtenerPorId(id);
        if (citaExistente.isPresent()) {
            citaActualizada.setId(id);
            return ResponseEntity.ok(citaMedicaService.guardar(citaActualizada));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        citaMedicaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/paciente/{idPaciente}")
    public List<CitaMedica> listarPorPaciente(@PathVariable Long idPaciente) {
        return citaMedicaService.listarPorPaciente(idPaciente);
    }
}