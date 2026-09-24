package com.wisdom.rental.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "equipment_name", nullable = false)
    private String equipmentName;
    @Column(name = "equipment_code", nullable = false, unique = true)
    private String equipmentCode;

    public Long getId() {
        return id;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public String getEquipmentCode() {
        return equipmentCode;
    }
}
