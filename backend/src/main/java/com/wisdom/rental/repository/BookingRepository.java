package com.wisdom.rental.repository;

import com.wisdom.rental.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.*;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByClassroomIdAndStatusAndStartTimeLessThanAndEndTimeGreaterThan(Long roomId, BookingStatus status, LocalDateTime end, LocalDateTime start);

    List<Booking> findByEndTimeAfterOrderByStartTime(LocalDateTime now);
}
