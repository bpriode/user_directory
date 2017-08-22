const express = require('express');
const router  = express.Router();

let data = [];

const getListings = function(req, res, next) {
  let MongoClient = require('mongodb').MongoClient;
  let assert = require('assert');

  let url = "mongodb://localhost:27017/robots";

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    getData(db, function() {
      db.close();
      next();
    });
  });

  let getData = function (db, callback) {
    let users = db.collection('users');

    users.find({}).toArray().then(function(users) {
        data = users;
        callback();
    });
  };

};

const getLooking = function(req, res, next) {
  let MongoClient = require('mongodb').MongoClient;
  let assert = require('assert');

  let url = "mongodb://localhost:27017/robots";

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    getData(db, function() {
      db.close();
      next();
    });
  });

  let getData = function (db, callback) {
    let users = db.collection('users');

    users.find({'job': null}).toArray().then(function(users) {
        data = users;
        callback();
    });
  };

};

const getEmployed = function(req, res, next) {
  let MongoClient = require('mongodb').MongoClient;
  let assert = require('assert');

  let url = "mongodb://localhost:27017/robots";

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    getData(db, function() {
      db.close();
      next();
    });
  });

  let getData = function (db, callback) {
    let users = db.collection('users');

    users.find({'job': {$nin: [null]}}).toArray().then(function(users) {
        data = users;
        callback();
    });
  };
};

const getCountry = function(req, res, next) {
  let MongoClient = require('mongodb').MongoClient;
  let assert = require('assert');

  let url = "mongodb://localhost:27017/robots";

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    getData(db, function() {
      db.close();
      next();
    });
  });

  let getData = function (db, callback) {
    let users = db.collection('users');

    users.find({}).toArray().then(function(users) {
        data = users;
        callback();
    });
  };
};




router.get('/', getListings, function (req, res) {
  res.render('listing', {users: data});
});

router.get('/looking', getLooking, function (req, res) {
  res.render('looking', {users: data});
});

router.get('/employed', getEmployed, function (req, res) {
  res.render('employed', {users: data});
});

router.get('/country', getCountry, function (req, res) {
  res.render('country', {users: data});
});

router.get('/listing/:id', getListings, function (req, res) {
  let id = req.params.id;

  let profile = data.find(function(user) {
    return user.id == id;
  })

  res.render('profile', profile);
});


module.exports = router;
