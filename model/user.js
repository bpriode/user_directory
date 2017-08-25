const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt     = require('bcryptjs');
const Schema     = mongoose.Schema;


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, required: true },
  passwordHash: { type: String, required: true },
  avatar: {type: String},
  name: {type: String, required: true},
  email: {type: String, required: true},
  university: {type: String},
  job: {type: String},
  company: {type: String},
  skills:[String],
  phone: {type: String},
  address:{
    street_num: {type: Number},
    street_name: {type: String},
    city: {type: String},
    state_or_province: {type: String},
    postal_code: {type: String},
    country: {type: String}
  }
});



userSchema.virtual('password')
    .get(function() {
        return null
    })
    .set(function(value) {
        const hash = bcrypt.hashSync(value, 8);
        this.passwordHash = hash;
    })

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};

const User = mongoose.model("User", userSchema);

module.exports = User;
