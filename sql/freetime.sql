DROP TABLE IF EXISTS freetime;


CREATE TABLE freetime(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type VARCHAR(100) DEFAULT "Freizeitangebote",
    organizer VARCHAR(300),
    description TEXT NOT NULL,
    place VARCHAR(300),
    event_date VARCHAR(300),
    creation_date VARCHAR(300),
    other TEXT,
    link TEXT NOT NULL,
    ts_event TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
