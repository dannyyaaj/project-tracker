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

module.exports = router;