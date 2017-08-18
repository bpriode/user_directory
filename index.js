const express         = require('express');
const data            = require('./data.js');
const mustacheExpress = require('mustache-express');
const app             = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.render('index', data);
});

app.get('/listing/:id', function (req, res) {  //puttting a colon in a route signals the dynamic part
  // let id = req.params.id; //params only goes with request. When a client sends you information
  // let user = data.users.find(function(user) {
  //   return user.id == id;
  // });
  res.render('listing', data.users[req.params.id -1]);
});

app.listen(3000,function() {
  console.log("App is running on localhost:3000");
});
