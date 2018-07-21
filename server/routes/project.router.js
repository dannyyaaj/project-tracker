const express = require('express');
let router = express.Router();
let pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('get projects');
  const queryText = `SELECT "projects".project_name, "projects".project_owner, DATE_PART('HOUR', SUM("entries".end_time - "entries".start_time)) as total_hours, DATE_PART('MINUTE', SUM("entries".end_time - "entries".start_time)) as total_minutes
FROM "projects" LEFT OUTER JOIN "entries" ON "entries".project_id = "projects".id
GROUP BY "projects".id
ORDER BY total_hours DESC NULLS LAST, "projects".project_name;
`;
  pool.query(queryText)
    .then((result) => {
      console.log('here are result.rows', result.rows)
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error selecting entries');
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  console.log('added project');
  const project = req.body;
  const queryText = `INSERT INTO "projects" ("project_name")
VALUES ($1);`;
  pool.query(queryText, [project.name])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('error making project insert query', error);
      res.sendStatus(500);
    });
})

module.exports = router;