package com.wisdom.rental.controller;

import com.wisdom.rental.dto.ClassroomUpdateRequest;
import com.wisdom.rental.entity.*;
import com.wisdom.rental.service.ClassroomService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {
    private final ClassroomService s;

    public ClassroomController(ClassroomService s) {
        this.s = s;
    }

    @GetMapping
    public List<Classroom> list() {
        return s.list();
    }

    @GetMapping("/equipment")
    public List<Equipment> equipment() {
        return s.equipment();
    }

    @GetMapping("/available")
    public List<Classroom> available(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end, @RequestParam(defaultValue = "1") int minCapacity, @RequestParam(defaultValue = "false") boolean accessible, @RequestParam(required = false) String equipment, @RequestParam(required = false) String roomType) {
        return s.available(start, end, minCapacity, accessible, equipment, roomType);
    }

    @PutMapping("/{id}")
    public Classroom update(@PathVariable Long id, @Valid @RequestBody ClassroomUpdateRequest r) {
        return s.update(id, r);
    }

    @PutMapping("/{id}/equipment/{code}")
    public Classroom add(@PathVariable Long id, @PathVariable String code) {
        return s.addEquipment(id, code);
    }

    @DeleteMapping("/{id}/equipment/{code}")
    public Classroom remove(@PathVariable Long id, @PathVariable String code) {
        return s.removeEquipment(id, code);
    }
}
