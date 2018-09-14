/* eslint no-console: 0 */
// @ts-check
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Basic error handler
app.use((err, req, res, next) => {
  /* eslint no-unused-vars: "off" */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

