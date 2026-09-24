package com.wisdom.rental.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public record BookingRequest(
        @NotNull
        Long classroomId,
        @NotNull
        Long customerId,
        @NotBlank
        String bookingUser,
        @NotNull
        LocalDateTime startTime,
        @NotNull
        LocalDateTime endTime,
        String comments) {
}
