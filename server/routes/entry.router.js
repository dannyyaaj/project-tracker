const express = require('express');
let router = express.Router();
let pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('get entries');
  const queryText = `SELECT "entries".description, "projects".project_name, "entries".date
FROM "entries" JOIN "projects" ON "entries".project_id = "projects".id;`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error selecting entries');
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  console.log('post entry');
  let newEntry = req.body;
  const queryText = `INSERT INTO "entries" ("project_id", "description", "date", "start_time", "end_time")
VALUES ($1, $2, $3, $4, $5);`;
  pool.query(queryText, [newEntry.project_id, newEntry.description, newEntry.date, newEntry.start_time, newEntry.end_time])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding entries');
      res.sendStatus(500);
    })
})

module.exports = router;