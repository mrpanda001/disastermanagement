CREATE DATABASE IF NOT EXISTS disaster_management;
USE disaster_management;

CREATE TABLE IF NOT EXISTS emergency_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emergency_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    contact VARCHAR(100) NOT NULL,
    anonymous BOOLEAN DEFAULT FALSE,
    timestamp DATETIME NOT NULL,
    status ENUM('pending', 'in_progress', 'resolved') DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS emergency_resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource_type VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    available BOOLEAN DEFAULT TRUE
); 