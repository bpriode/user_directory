const express = require('express');
const router  = express.Router();
const User    = require('../models/data.js');
const Data    = require('../models/data.js');


router.get('/', function (req, res) {
  res.render('index', {users: Data.allUsers});
});

router.get('/listing/:id', function (req, res) {
  let id = req.params.id;

  let profile = Data.allUsers.find(function(user) {
    return user.id == id;
  })

  res.render('listing', profile);
});

module.exports = router;
