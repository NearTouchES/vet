package pe.com.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.veterinaria.modelo.Paciente;
import pe.com.veterinaria.service.PacienteService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping
    public List<Paciente> listar() {
        return pacienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> obtenerPorId(@PathVariable Long id) {
        Optional<Paciente> paciente = pacienteService.obtenerPorId(id);
        return paciente.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Paciente> crear(@RequestBody Paciente paciente) {
        Paciente nuevo = pacienteService.guardar(paciente);
        return ResponseEntity.ok(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizar(@PathVariable Long id, @RequestBody Paciente pacienteActualizado) {
        Optional<Paciente> existente = pacienteService.obtenerPorId(id);
        if (existente.isPresent()) {
            pacienteActualizado.setId(id);
            return ResponseEntity.ok(pacienteService.guardar(pacienteActualizado));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pacienteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tutor/{idTutor}")
    public List<Paciente> listarPorTutor(@PathVariable Long idTutor) {
        return pacienteService.listarPorTutor(idTutor);
    }
}
