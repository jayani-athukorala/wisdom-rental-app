# Wisdom Rental Suite

A full-stack Java EE Classroom Rental application.

## Stack
- Frontend: React + TypeScript + Vite
- Backend: Spring Boot 3 + Spring Data JPA + Bean Validation
- Database: PostgreSQL + Flyway
- Dev infrastructure: Docker Compose

## Project folders
- `wisdom-rental-api` concept -> implemented in `/backend`
- `wisdom-rental-web` concept -> implemented in `/frontend`

## Run
1. `docker compose up -d db`
2. Backend: `cd backend && mvn spring-boot:run`
3. Frontend: `cd frontend && npm install && npm run dev`
4. Open `http://localhost:5173`

Default API: `http://localhost:8080/api`

## Features migrated
- Company and individual customer registration/search/deactivation
- Classroom list and editing accessibility
- Equipment add/remove per room
- Availability search by date/time, capacity, accessibility, equipment, and room type
- Booking creation with conflict prevention
- Upcoming booking list and filtering
- Booking cancellation
- PostgreSQL schema and original seed data
