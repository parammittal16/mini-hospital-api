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
      req.query.img, // starting funds
      req.query.model
    ]
  }
  //  args:
  //   [
  //     req.query.funds, // starting funds
  //     req.query.size, // (initial) wager size
  //     req.query.count, // wager count — number of wagers per sim
  //     req.query.sims // number of simulations
  //   ]
  // }
  console.log("------>", options);
  PythonShell.run('./python-scripts/brain-tumor-detection/predict.py', options , function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(data);
    res.send(data)
    // res.send("done");
  });
});

app.get('/', (req, res) => res.send('Hello2 World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));