package com.wisdom.rental.repository;

import com.wisdom.rental.entity.Classroom;
import com.wisdom.rental.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

    @Query("""
            SELECT DISTINCT c
            FROM Classroom c
            LEFT JOIN c.equipment e
            WHERE c.active = true
              AND c.capacity >= :capacity
              AND (:accessible = false OR c.accessible = true)
              AND (:type IS NULL OR c.roomType = :type)
              AND (:equipment IS NULL OR e.equipmentCode = :equipment)
              AND NOT EXISTS (
                  SELECT b.id
                  FROM Booking b
                  WHERE b.classroom = c
                    AND b.status = com.wisdom.rental.entity.BookingStatus.ACTIVE
                    AND b.startTime < :end
                    AND b.endTime > :start
              )
            ORDER BY c.capacity, c.roomName
            """)
    List<Classroom> searchAvailable(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end,
            @Param("capacity") int capacity,
            @Param("accessible") boolean accessible,
            @Param("equipment") String equipment,
            @Param("type") RoomType type
    );
}
