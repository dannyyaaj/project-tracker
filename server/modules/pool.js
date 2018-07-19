const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'project_tracker',
  max: 10,
  idleTimeoutMillis: 30000
})

pool.on('connect', function () {
  console.log('PG connected to Postgres');
})

pool.on('error', function (error) {
  console.log('Error on connecting to Postgres', error);
})

module.exports = pool;