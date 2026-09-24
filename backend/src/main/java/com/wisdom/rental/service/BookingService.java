package com.wisdom.rental.service;

import com.wisdom.rental.dto.BookingRequest;
import com.wisdom.rental.entity.*;
import com.wisdom.rental.exception.ApiException;
import com.wisdom.rental.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class BookingService {
    private final BookingRepository bookings;
    private final ClassroomRepository rooms;
    private final CustomerRepository customers;

    public BookingService(BookingRepository b, ClassroomRepository r, CustomerRepository c) {
        bookings = b;
        rooms = r;
        customers = c;
    }

    public List<Booking> upcoming() {
        return bookings.findByEndTimeAfterOrderByStartTime(LocalDateTime.now());
    }

    public Booking create(BookingRequest r) {
        if (!r.endTime().isAfter(r.startTime())) throw new ApiException("End time must be after start time");
        Classroom room = rooms.findById(r.classroomId()).orElseThrow(() -> new ApiException("Classroom not found"));
        Customer customer = customers.findById(r.customerId()).orElseThrow(() -> new ApiException("Customer not found"));
        if (!customer.isActive()) throw new ApiException("Customer is inactive");
        if (bookings.existsByClassroomIdAndStatusAndStartTimeLessThanAndEndTimeGreaterThan(room.getId(), BookingStatus.ACTIVE, r.endTime(), r.startTime()))
            throw new ApiException("Room already booked for selected time");
        Booking b = new Booking();
        b.setClassroom(room);
        b.setCustomer(customer);
        b.setBookingUser(r.bookingUser());
        b.setStartTime(r.startTime());
        b.setEndTime(r.endTime());
        b.setComments(r.comments());
        return bookings.save(b);
    }

    public Booking cancel(Long id) {
        Booking b = bookings.findById(id).orElseThrow(() -> new ApiException("Booking not found"));
        b.setStatus(BookingStatus.CANCELLED);
        return bookings.save(b);
    }
}
