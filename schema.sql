-- ============================================================
-- Student Management System — Database Schema
-- Run: psql -U postgres -d student_management -f schema.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    uid       SERIAL PRIMARY KEY,
    firstname VARCHAR(50)  NOT NULL,
    lastname  VARCHAR(50),
    email     VARCHAR(100) UNIQUE NOT NULL,
    password  VARCHAR(255) NOT NULL
);

INSERT INTO users (firstname, lastname, email, password) VALUES
    ('Admin', 'User', 'admin@student.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

CREATE TABLE IF NOT EXISTS students (
    id         SERIAL PRIMARY KEY,
    fullname   VARCHAR(100) NOT NULL,
    email      VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    phone      VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample students
INSERT INTO students (fullname, email, department, phone) VALUES
    ('Alice Johnson',  'alice@university.edu',  'Computer Science',        '555-0101'),
    ('Bob Martinez',   'bob@university.edu',     'Electrical Engineering',  '555-0102'),
    ('Carol Williams', 'carol@university.edu',   'Business Administration', '555-0103')
ON CONFLICT (email) DO NOTHING;
