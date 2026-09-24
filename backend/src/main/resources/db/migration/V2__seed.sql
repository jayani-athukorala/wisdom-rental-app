-- ============================================================
-- Wisdom Rental - PostgreSQL seed.sql
-- Development seed data
-- ============================================================

-- ===============================
-- EQUIPMENT
-- ===============================

INSERT INTO equipment (equipment_name, equipment_code) VALUES
                                                           ('Projector', 'PROJ'),
                                                           ('Whiteboard', 'WB'),
                                                           ('WiFi', 'WIFI'),
                                                           ('Microphone', 'MIC'),
                                                           ('TV Screen', 'TV'),
                                                           ('Premium AV System', 'AV'),
                                                           ('Stage', 'STAGE'),
                                                           ('Video Conference System', 'VC'),
                                                           ('Speaker System', 'SPK'),
                                                           ('Smart Board', 'SMART');

-- ===============================
-- CLASSROOMS
-- ===============================

INSERT INTO classrooms
(room_name, capacity, room_type, accessible)
VALUES

-- SMALL
('ORION', 10, 'SMALL', TRUE),
('NOVA', 10, 'SMALL', FALSE),
('FOCUS', 10, 'SMALL', FALSE),
('EDGE', 10, 'SMALL', TRUE),
('SPARK', 10, 'SMALL', FALSE),
('ATLAS', 20, 'SMALL', TRUE),
('CORE', 20, 'SMALL', TRUE),

-- MEDIUM
('AURORA', 30, 'MEDIUM', TRUE),
('VISION', 30, 'MEDIUM', TRUE),
('ZENITH', 30, 'MEDIUM', TRUE),
('SUMMIT', 50, 'MEDIUM', TRUE),
('HORIZON', 50, 'MEDIUM', TRUE),
('PRIME', 50, 'MEDIUM', TRUE),

-- SEMINAR
('TITAN', 75, 'SEMINAR', TRUE),
('ELITE', 75, 'SEMINAR', TRUE),
('APEX', 75, 'SEMINAR', TRUE),

-- LARGE
('GRAND SEMINAR', 100, 'LARGE', TRUE),
('EXECUTIVE HALL', 100, 'LARGE', TRUE),

-- HALL
('MEGA HALL A', 200, 'HALL', TRUE),
('MEGA HALL B', 200, 'HALL', TRUE);

-- ===============================
-- CLASSROOM EQUIPMENT
-- ===============================

INSERT INTO classroom_equipment VALUES
-- ORION
(1,1),(1,2),(1,3),

-- NOVA
(2,2),(2,3),

-- FOCUS
(3,2),

-- EDGE
(4,1),(4,2),

-- SPARK
(5,5),

-- ATLAS
(6,1),(6,3),

-- CORE
(7,1),(7,2),

-- AURORA
(8,1),(8,4),(8,3),

-- VISION
(9,10),(9,3),

-- ZENITH
(10,1),(10,2),(10,3),

-- SUMMIT
(11,1),(11,4),(11,9),

-- HORIZON
(12,1),(12,4),(12,7),

-- PRIME
(13,6),(13,9),(13,3),

-- TITAN
(14,6),(14,7),(14,8),

-- ELITE
(15,1),(15,4),(15,8),

-- APEX
(16,6),(16,7),(16,9),

-- GRAND SEMINAR
(17,6),(17,7),(17,8),(17,9),

-- EXECUTIVE HALL
(18,1),(18,4),(18,10),

-- MEGA HALL A
(19,6),(19,7),(19,8),(19,9),(19,10),

-- MEGA HALL B
(20,1),(20,2),(20,3),(20,4),(20,5);

-- ===============================
-- CUSTOMERS
-- ===============================

INSERT INTO customers
(customer_type, full_name, company_name, email, phone)
VALUES
    ('COMPANY', 'Emma Johnson', 'TechNova AB',
     'emma@technova.se', '+46701234567'),

    ('COMPANY', 'Liam Andersson', 'Nordic Skills',
     'liam@nordic.se', '+46701112233'),

    ('INDIVIDUAL', 'Sophia Nilsson', NULL,
     'sophia@gmail.com', '+46709998877');

-- ===============================
-- BOOKINGS
-- ===============================

INSERT INTO bookings
(
    classroom_id,
    customer_id,
    booking_user,
    start_time,
    end_time,
    comments
)
VALUES
    (
        15,
        1,
        'Emma Johnson',
        '2026-05-14 09:00:00',
        '2026-05-14 11:00:00',
        'Training session'
    ),
    (
        11,
        2,
        'Liam Andersson',
        '2026-05-15 10:00:00',
        '2026-05-15 13:00:00',
        'Workshop'
    ),
    (
        1,
        3,
        'Sophia Nilsson',
        '2026-05-16 14:00:00',
        '2026-05-16 15:00:00',
        'Private coaching'
    );

-- ============================================================
-- END
-- ============================================================