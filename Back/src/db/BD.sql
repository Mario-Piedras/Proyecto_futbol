CREATE DATABASE IF NOT EXISTS futbol_equipos;
USE Futbol_equipos;

CREATE TABLE IF NOT EXISTS equipos (
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_equipo VARCHAR(100) NOT NULL
);

-- Insert = POST
INSERT INTO equipos (nombre_equipo) VALUES 
('Alemania'),
('Holanda'),
('Suecia'),
('Francia'),
('Noruega');

-- Select = GET
SELECT * FROM equipos;