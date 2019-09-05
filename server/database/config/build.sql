BEGIN;

DROP TABLE IF EXISTS city, users cascade;

CREATE TABLE city (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  country TEXT NOT NULL
);

create Table users (
  id serial primary key,
  email varchar unique,
  password varchar
);

INSERT INTO city (name, country) VALUES
  ('Gaza', 'Palestine'),
  ('London', 'UK'),
  ('New York', 'USA');

COMMIT;
