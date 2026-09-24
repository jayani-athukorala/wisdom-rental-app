-- ============================================================
-- Wisdom Rental - PostgreSQL init.sql
-- Database schema
-- ============================================================

DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS classroom_equipment CASCADE;
DROP TABLE IF EXISTS equipment CASCADE;
DROP TABLE IF EXISTS classrooms CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- ===============================
-- CUSTOMERS
-- ===============================

CREATE TABLE customers (
                           id              BIGSERIAL PRIMARY KEY,

                           customer_type   VARCHAR(20) NOT NULL
                               CHECK (customer_type IN ('COMPANY', 'INDIVIDUAL')),

                           full_name       VARCHAR(100) NOT NULL,
                           company_name    VARCHAR(100),

                           email           VARCHAR(150) NOT NULL UNIQUE,
                           phone           VARCHAR(30) NOT NULL UNIQUE,

                           active          BOOLEAN NOT NULL DEFAULT TRUE,
                           created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- CLASSROOMS
-- ===============================

CREATE TABLE classrooms (
                            id              BIGSERIAL PRIMARY KEY,

                            room_name       VARCHAR(100) NOT NULL UNIQUE,

                            capacity        INT NOT NULL
                                CHECK (capacity > 0),

                            room_type       VARCHAR(20) NOT NULL
                                CHECK (
                                    room_type IN ('SMALL', 'MEDIUM', 'SEMINAR', 'LARGE', 'HALL')
                                    ),

                            accessible      BOOLEAN NOT NULL DEFAULT FALSE,
                            active          BOOLEAN NOT NULL DEFAULT TRUE,

                            created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- EQUIPMENT
-- ===============================

CREATE TABLE equipment (
                           id              BIGSERIAL PRIMARY KEY,
                           equipment_name  VARCHAR(100) NOT NULL,
                           equipment_code  VARCHAR(20) NOT NULL UNIQUE
);

-- ===============================
-- CLASSROOM EQUIPMENT
-- ===============================

CREATE TABLE classroom_equipment (
                                     classroom_id    BIGINT NOT NULL
                                         REFERENCES classrooms(id) ON DELETE CASCADE,

                                     equipment_id    BIGINT NOT NULL
                                         REFERENCES equipment(id) ON DELETE CASCADE,

                                     PRIMARY KEY (classroom_id, equipment_id)
);

-- ===============================
-- BOOKINGS
-- ===============================

CREATE TABLE bookings (
                          id              BIGSERIAL PRIMARY KEY,

                          classroom_id    BIGINT NOT NULL
                              REFERENCES classrooms(id),

                          customer_id     BIGINT NOT NULL
                              REFERENCES customers(id),

                          booking_user    VARCHAR(100) NOT NULL,

                          start_time      TIMESTAMP NOT NULL,
                          end_time        TIMESTAMP NOT NULL,

                          comments        TEXT,

                          status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
                              CHECK (status IN ('ACTIVE', 'CANCELLED')),

                          created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          modified_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                          CONSTRAINT chk_booking_time
                              CHECK (end_time > start_time)
);

-- ===============================
-- INDEXES
-- ===============================

CREATE INDEX idx_bookings_room_time
    ON bookings(classroom_id, start_time, end_time);

CREATE INDEX idx_bookings_customer
    ON bookings(customer_id);

CREATE INDEX idx_classrooms_capacity
    ON classrooms(capacity);

-- ============================================================
-- END
-- ============================================================