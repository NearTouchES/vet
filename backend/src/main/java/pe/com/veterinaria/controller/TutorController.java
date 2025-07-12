package pe.com.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.veterinaria.modelo.Tutor;
import pe.com.veterinaria.service.TutorService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tutores")
public class TutorController {

    private final TutorService tutorService;

    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

    @GetMapping
    public List<Tutor> listar() {
        return tutorService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutor> obtenerPorId(@PathVariable Long id) {
        Optional<Tutor> tutor = tutorService.obtenerPorId(id);
        return tutor.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<Tutor> buscarPorDni(@PathVariable String dni) {
        Optional<Tutor> tutor = tutorService.buscarPorDni(dni);
        return tutor.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tutor> crear(@RequestBody Tutor tutor) {
        Tutor nuevo = tutorService.guardar(tutor);
        return ResponseEntity.ok(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutor> actualizar(@PathVariable Long id, @RequestBody Tutor tutorActualizado) {
        Optional<Tutor> existente = tutorService.obtenerPorId(id);
        if (existente.isPresent()) {
            tutorActualizado.setId(id);
            return ResponseEntity.ok(tutorService.guardar(tutorActualizado));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        tutorService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
