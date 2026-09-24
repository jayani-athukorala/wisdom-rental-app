package com.wisdom.rental.dto;

import com.wisdom.rental.entity.CustomerType;
import jakarta.validation.constraints.*;

public record CustomerRequest(
        @NotNull
        CustomerType customerType,
        @NotBlank
        String fullName,
        String companyName,
        @Email
        @NotBlank
        String email,
        @NotBlank
        String phone) {
}
