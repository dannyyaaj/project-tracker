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

2. Creat tables

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
  "start_time" TIME NOT NULL DEFAULT NOW(),
  "end_time" TIME NOT NULL
);
```


