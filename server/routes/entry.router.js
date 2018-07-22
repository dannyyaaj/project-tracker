const express = require('express');
let router = express.Router();
let pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('get entries');
  const queryText = `
SELECT "projects".project_name, "entries".description, "entries".start_time, "entries".end_time, "entries".time_stamp, DATE_PART('HOUR', "entries".start_time) as start_hour, DATE_PART('MINUTE', "entries".start_time) as start_minute, DATE_PART('HOUR', "entries".end_time) as end_hour, DATE_PART('MINUTE', "entries".end_time) as end_minute
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
      console.log('Error selecting entries', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body, 'req.body before posting into POSTGRESQL')
  let newEntry = req.body;
  const queryText = `INSERT INTO "entries" ("project_id", "description", "start_time", "end_time")
VALUES ($1, $2, $3, $4);`;
  pool.query(queryText, [newEntry.project_id, newEntry.description, newEntry.start_time, newEntry.end_time])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding entries', error);
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

module.exports = router;