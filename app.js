/*eslint-env es6*/
const express = require('express');
var bodyParser = require('body-parser');
let { PythonShell } = require('python-shell');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/brain', (req, res) => {
  const brain_path = __dirname + '/python-scripts/brain-tumor-detection';
  var options = {
    args:
      [
        brain_path + '/data/' + req.query.img,
        brain_path + '/cnn-parameters-improvement-23-0.91.model'
      ]
  }
  console.log("------>", options);
  PythonShell.run(brain_path + '/predict.py', options, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(data);
    res.send(data)
  });
});

app.get('/bone', (req, res) => {
  const bone_path = __dirname + '/python-scripts/bone-fracture-detection';
  var options = {
    args:
      [
        bone_path + '/data/' + req.query.img,
        bone_path + '/model.h5'
      ]
  }
  console.log("------>", options);
  PythonShell.run(bone_path + '/predict.py', options, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(data);
    res.send(data)
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//python3 predict.py '/home/ubuntu18/Documents/My/00 PROJECTS/4rth YEAR PROJECT/mini-hospital-api/python-scripts/bone-fracture-detection/bone.png'
