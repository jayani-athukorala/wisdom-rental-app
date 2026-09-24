package com.wisdom.rental.repository;

import com.wisdom.rental.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    Optional<Equipment> findByEquipmentCodeIgnoreCase(String code);
}
