const express = require('express');
let router = express.Router();
let pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('get projects');
  const queryText = `SELECT "projects".id, "projects".project_name, "projects".project_owner FROM "projects";`;
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