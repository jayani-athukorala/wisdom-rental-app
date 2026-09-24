package com.wisdom.rental.controller;

import com.wisdom.rental.dto.BookingRequest;
import com.wisdom.rental.entity.Booking;
import com.wisdom.rental.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService s;

    public BookingController(BookingService s) {
        this.s = s;
    }

    @GetMapping
    public List<Booking> upcoming() {
        return s.upcoming();
    }

    @PostMapping
    public Booking create(@Valid @RequestBody BookingRequest r) {
        return s.create(r);
    }

    @PatchMapping("/{id}/cancel")
    public Booking cancel(@PathVariable Long id) {
        return s.cancel(id);
    }
}
