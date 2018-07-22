const express = require('express');
let router = express.Router();
let pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('get entries');
  const queryText = `
SELECT "projects".project_name, "entries".description, "entries".date, "entries".start_time, "entries".end_time, "entries".time_stamp, DATE_PART('HOUR', "entries".start_time) as start_hour, DATE_PART('MINUTE', "entries".start_time) as start_minute, DATE_PART('HOUR', "entries".end_time) as end_hour, DATE_PART('MINUTE', "entries".end_time) as end_minute
FROM "entries"
JOIN "projects"
ON "entries".project_id = "projects".id
ORDER BY "entries".time_stamp DESC;
`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error selecting entries');
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log('post entry');
  console.log(req.body, 'req.body before posting into POSTGRESQL')
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
    });
});

router.delete('/:id', (req, res) => {
  let entryId = req.params.id;
  pool.query(`DELETE FROM "entries" WHERE "id"=$1;`, [entryId])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const newEntry = req.body;
  const entryId = req.params.id;
  pool.query(`UPDATE "entries" SET "description" = $1, "date" = $2, "start_time" = $3, "end_time" = $4
WHERE "id" = $5;`, [newEntry.description, newEntry.date, newEntry.start_time, newEntry.end_time, entryId])
    .then(results => {
      console.log(results);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('/crew PUT error:', error);
      res.sendStatus(500);
    });
});
module.exports = router;