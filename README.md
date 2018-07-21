# Project Time Tracker
---

## Features

- Add projects by name
- Track time to projects (task name, date, start time and end time)
- Display a history of all time entries
- Delete existing entries
- Show total hours worked next to each project on the project page

---

## Setting Up

1. Create Database in POSTICO

```sql
CREATE DATABASE "project_tracker";
```

2. Create tables

```sql
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
  "start_time" VARCHAR(20),
  "end_time" VARCHAR(20),
);

-- Dummy data
INSERT INTO "projects" ("project_name", "project_owner")
VALUES ('Koala Holla', 'Danny');

INSERT INTO "entries" ("project_id", "description", "start_time", "end_time")
VALUES ('1', 'Finished MVP', '10:00AM', '2:00PM');