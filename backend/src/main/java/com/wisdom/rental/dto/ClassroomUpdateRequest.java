package com.wisdom.rental.dto;

import jakarta.validation.constraints.*;

public record ClassroomUpdateRequest(
        @Min(1)
        int capacity,
        boolean accessible,
        boolean active) {
}
