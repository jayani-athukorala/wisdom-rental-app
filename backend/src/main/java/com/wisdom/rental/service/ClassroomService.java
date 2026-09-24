package com.wisdom.rental.service;

import com.wisdom.rental.dto.ClassroomUpdateRequest;
import com.wisdom.rental.entity.Classroom;
import com.wisdom.rental.entity.Equipment;
import com.wisdom.rental.entity.RoomType;
import com.wisdom.rental.exception.ApiException;
import com.wisdom.rental.repository.ClassroomRepository;
import com.wisdom.rental.repository.EquipmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class ClassroomService {
    private final ClassroomRepository rooms;
    private final EquipmentRepository equipment;

    public ClassroomService(ClassroomRepository rooms, EquipmentRepository equipment) {
        this.rooms = rooms;
        this.equipment = equipment;
    }

    public List<Classroom> list() {
        return rooms.findAll();
    }

    public List<Equipment> equipment() {
        return equipment.findAll();
    }

    public List<Classroom> available(LocalDateTime start, LocalDateTime end, int capacity,
                                     boolean accessible, String equipmentCode, String roomType) {
        if (!end.isAfter(start)) throw new ApiException("End time must be after start time");

        String normalizedEquipment = normalize(equipmentCode);
        RoomType normalizedType = parseRoomType(roomType);
        return rooms.searchAvailable(start, end, capacity, accessible, normalizedEquipment, normalizedType);
    }

    private String normalize(String value) {
        return value == null || value.isBlank() ? null : value.trim().toUpperCase(Locale.ROOT);
    }

    private RoomType parseRoomType(String value) {
        if (value == null || value.isBlank()) return null;
        try {
            return RoomType.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new ApiException("Invalid room type: " + value);
        }
    }

    public Classroom update(Long id, ClassroomUpdateRequest request) {
        Classroom classroom = get(id);
        classroom.setCapacity(request.capacity());
        classroom.setAccessible(request.accessible());
        classroom.setActive(request.active());
        return rooms.save(classroom);
    }

    @Transactional
    public Classroom addEquipment(Long id, String code) {
        Classroom classroom = get(id);
        Equipment item = equipment.findByEquipmentCodeIgnoreCase(code)
                .orElseThrow(() -> new ApiException("Equipment not found"));
        classroom.getEquipment().add(item);
        return rooms.save(classroom);
    }

    @Transactional
    public Classroom removeEquipment(Long id, String code) {
        Classroom classroom = get(id);
        classroom.getEquipment().removeIf(item -> item.getEquipmentCode().equalsIgnoreCase(code));
        return rooms.save(classroom);
    }

    private Classroom get(Long id) {
        return rooms.findById(id).orElseThrow(() -> new ApiException("Classroom not found"));
    }
}
