const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const pool = require('./modules/pool');
const bodyParser = require('body-parser');
const entryRouter = require('./routes/entry.router');
const projectRouter = require('./routes/project.router');
const reportRouter = require('./routes/report.router');


app.use(express.static('server/public'));
app.use(bodyParser.json());

//entries route
app.use('/entry', entryRouter);

//projects route
app.use('/project', projectRouter);

//reports route
app.use('/report', reportRouter);

app.listen(PORT, () => {
  console.log('listening on PORT', PORT);
})