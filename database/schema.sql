-- ============================================
-- Mini SaaS Dashboard Database Schema
-- PostgreSQL Database Setup Script
-- ============================================

-- Create database (run this separately if needed)
-- CREATE DATABASE mini_sass_dashboard;

-- Connect to the database
-- \c mini_sass_dashboard;

-- ============================================
-- Users Table
-- Stores user accounts for authentication
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- Projects Table
-- Stores project information
-- Fields: id, status, deadline, assigned_team_member, budget
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    deadline DATE NOT NULL,
    assigned_team_member VARCHAR(255) NOT NULL,
    budget NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status field for faster filtering
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Create index on deadline for sorting
CREATE INDEX IF NOT EXISTS idx_projects_deadline ON projects(deadline);

-- ============================================
-- Seed Data
-- Insert 10-15 example projects for testing
-- ============================================

-- Insert sample projects
INSERT INTO projects (name, status, deadline, assigned_team_member, budget) VALUES
('Website Redesign', 'active', '2024-03-15', 'John Smith', 15000.00),
('Mobile App Development', 'active', '2024-04-20', 'Sarah Johnson', 35000.00),
('E-commerce Platform', 'on hold', '2024-05-10', 'Mike Davis', 50000.00),
('Marketing Campaign', 'active', '2024-03-30', 'Emily Brown', 12000.00),
('Database Migration', 'completed', '2024-02-28', 'David Wilson', 8000.00),
('API Integration', 'active', '2024-04-05', 'Lisa Anderson', 18000.00),
('Cloud Infrastructure Setup', 'active', '2024-05-15', 'Robert Taylor', 25000.00),
('Security Audit', 'on hold', '2024-06-01', 'Jennifer Martinez', 15000.00),
('Content Management System', 'completed', '2024-02-15', 'James Garcia', 22000.00),
('Analytics Dashboard', 'active', '2024-04-12', 'Amanda Lee', 14000.00),
('Payment Gateway Integration', 'active', '2024-03-25', 'Christopher White', 16000.00),
('User Authentication System', 'completed', '2024-02-10', 'Jessica Harris', 10000.00),
('Performance Optimization', 'on hold', '2024-05-20', 'Daniel Clark', 12000.00),
('Documentation Portal', 'active', '2024-04-08', 'Michelle Lewis', 9000.00),
('Automated Testing Suite', 'active', '2024-05-30', 'Matthew Walker', 20000.00)
ON CONFLICT DO NOTHING;

-- ============================================
-- Comments
-- ============================================
-- Projects table structure:
-- - id: Auto-incrementing primary key
-- - name: Project name (required)
-- - status: Project status (active, on hold, completed) - indexed for fast filtering
-- - deadline: Project deadline date (required)
-- - assigned_team_member: Name of assigned team member (required)
-- - budget: Project budget in USD (required, NUMERIC type for precision)
-- - created_at: Timestamp when project was created
-- - updated_at: Timestamp when project was last updated

-- Indexes:
-- - idx_projects_status: Speeds up filtering by status (used in frontend filter)
-- - idx_projects_deadline: Speeds up sorting by deadline
