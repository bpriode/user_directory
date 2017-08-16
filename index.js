const express         = require('express');
const data           = require('./data.js');
const mustacheExpress = require('mustache-express');
const app             = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.render('index', data);
});

app.get('/listing/:id', function (req, res) {
  let users = data.users[req.params.id -1];
  res.render('listing', data);
});

app.listen(3000,function() {
  console.log("App is running on localhost:3000");
});
