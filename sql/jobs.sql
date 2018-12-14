-- Firmen Name
-- Link
-- Job Name
-- Ort
-- Volle Beschreibung
-- Sonstiges

DROP TABLE IF EXISTS jobs;


CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    description TEXT NOT NULL,
    description TEXT NOT NULL,
    place VARCHAR(300) NOT NULL,
    other VARCHAR(300) NOT NULL,
    link TEXT NOT NULL,
    ts_jobs TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
