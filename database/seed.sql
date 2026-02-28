-- ============================================
-- Seed Data Script
-- Run this after creating the schema
-- Inserts sample projects for testing
-- ============================================

-- Clear existing data (optional - uncomment if you want to reset)
-- TRUNCATE TABLE projects RESTART IDENTITY CASCADE;

-- Insert sample projects (10-15 examples)
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

-- Verify inserted data
SELECT COUNT(*) as total_projects FROM projects;
SELECT * FROM projects ORDER BY id;
