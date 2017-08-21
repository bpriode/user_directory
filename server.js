const express         = require('express');
const mustacheExpress = require('mustache-express');
const routes          = require('./routes/index.js');
const app             = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('./public'));

app.use(routes);


app.listen(3000,function() {
  console.log("App is running on localhost:3000");
});
