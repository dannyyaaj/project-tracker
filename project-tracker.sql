-- Create Database
CREATE DATABASE "project_tracker";

-- Make tables

-- Project Table
CREATE TABLE "projects"
(
  "id" SERIAL PRIMARY KEY,
  "project_name" VARCHAR(100),
  "completed" BOOLEAN DEFAULT False
);

-- Entries Table
CREATE TABLE "entries"
(
  "id" SERIAL PRIMARY KEY,
  "project_id" INT REFERENCES "projects",
  "description" VARCHAR(100),
  "date" DATE NOT NULL DEFAULT CURRENT_DATE,
  "start_time" TIME NOT NULL DEFAULT NOW(),
  "end_time" TIME NOT NULL
);

-- Dummy Data

-- projects
INSERT INTO "projects"
  ("project_name")
VALUES
  ('Koala Holla');

-- entries
INSERT INTO "entries"
  ("project_id","description","date","start_time", "end_time")
VALUES
  (1, 'set up static files', CURRENT_DATE, NOW(), NOW() + interval
'2 hours');