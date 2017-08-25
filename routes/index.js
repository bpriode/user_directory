const express  = require('express');
const User     = require('../model/user');
const mongoose = require('mongoose');
const passport = require('passport');
const router   = express.Router();

let data = [];


mongoose.connect("mongodb://localhost:27017/robots");

const requireLogin = function (req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/');
  }
};

const login = function (req, res, next) {
  if (req.user) {
    res.redirect("/listing")
  } else {
    next();
  }
};

router.get("/", login, function(req, res) {

  res.render("login", {
      messages: res.locals.getMessages()
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/listing',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/signup", function(req, res) {
  res.render("signup", {users: data});
});

router.post("/signup", function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    avatar:req.body.avatar,
    email: req.body.email,
    university: req.body.university,
    job: req.body.job,
    company: req.body.company,
    skills: [req.body.skills],
    phone: req.body.phone,
    address: {
        street_num: req.body.streetNum,
        street_name: req.body.streetName,
        city: req.body.city,
        state_or_province: req.body.stateProvince,
        postal_code: req.body.postalCode,
        country: req.body.country
    }
  })
  .then(function(data) {
    console.log(data);
    res.redirect("/login");
  })
  .catch(function(err) {
    console.log(err);
    res.redirect("/signup");
  });
});

router.get("/listing", requireLogin, function(req, res) {
  User.find({}).sort('name')
  .then(function(users) {
    data = users;
      res.render('listing', {users: users});
    next();
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
  // res.render("listing");
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});





let getData = function (db, callback) {
  let users = db.collection('users');

    User.find({}).toArray().sort({'name': 1}).then(function(users) {
        data = users;
        callback();
    });
};




router.get('/listing', function (req, res) {

  User.find({}).sort('name')
  .then(function(users) {
    data = users;
      res.render('listing', {users: users});
    next();
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
});


router.get('/looking', function (req, res) {

  User.find({'job': null}).sort('name')
  .then(function(users) {
    data = users
      res.render('looking', {users: users});
    next();
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
});

router.get('/employed', function (req, res) {

  User.find({'job': {$nin: [null]}}).sort('name')
  .then(function(users) {
    data = users
      res.render('employed', {users: users});
    next();
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
});

router.get('/listing/:id', function (req, res) {
  let id = req.params.id;

  let profile = data.find(function(user) {
    return user.id == id;
  })

  res.render('profile', profile);
});

// router.get('/edit/:id', function (req, res) {
//   let editId = req.params.id;
//
//   let userEdit = data.find(function(user) {
//     return user.id == editId;
//   })
//
//   res.render('edit', userEdit);
// });


module.exports = router;
