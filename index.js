const express         = require('express');
const users           = require('./data.js');
const mustacheExpress = require('mustache-express');
const app             = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.render('index', {users: users});
});

// app.get('/', function (req, res) {
//   res.render('profile', {users: users});
// });

app.get('/listing/:id', function (req, res) {
  res.render('profile', {users: users});
});

app.listen(3000,function() {
  console.log("App is running on localhost:3000");
});
