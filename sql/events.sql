-- Name
-- Datum
-- Veranstalter
-- Sonstiges
-- Volle Beschreibung
-- Ort
-- Link

DROP TABLE IF EXISTS events;


CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    organizer TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date VARCHAR(300) NOT NULL,
    other VARCHAR(300) NOT NULL,
    link TEXT NOT NULL,
    ts_events TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
