const express = require('express');
var bodyParser = require('body-parser');
let {PythonShell} = require('python-shell');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/sample', (req, res) => {
  var options = {
    args:
    [
      req.query.funds, // starting funds
      req.query.size, // (initial) wager size
      req.query.count, // wager count — number of wagers per sim
      req.query.sims // number of simulations
    ]
  }
  console.log("------>", options);
  PythonShell.run('./python-scripts/sample.py', options, function (err, data) {
    if (err) res.send(err);
    console.log(data.toString());
    res.send(data.toString())
  });
});

app.get('/', (req, res) => res.send('Hello2 World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));