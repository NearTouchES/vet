package pe.com.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.veterinaria.modelo.Medico;
import pe.com.veterinaria.service.MedicoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @GetMapping
    public List<Medico> listar() {
        return medicoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medico> obtenerPorId(@PathVariable Long id) {
        Optional<Medico> medico = medicoService.obtenerPorId(id);
        return medico.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Medico> crear(@RequestBody Medico medico) {
        Medico nuevoMedico = medicoService.guardar(medico);
        return ResponseEntity.ok(nuevoMedico);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medico> actualizar(@PathVariable Long id, @RequestBody Medico medicoActualizado) {
        Optional<Medico> medicoExistente = medicoService.obtenerPorId(id);
        if (medicoExistente.isPresent()) {
            medicoActualizado.setId(id);
            return ResponseEntity.ok(medicoService.guardar(medicoActualizado));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        medicoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}