const { join } = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validatePostData } = require('./auth');
const { signUpSc } = require('./schema');
const { addUser } = require('../database/queries/addUser');

require('env2')('./config.env');
exports.renderSignup = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
};
exports.postSignUp = (req, res) => {
  if (req.logedIn) {
    res.redirect('/cities');
  } else {
    console.log(req.body);
    validatePostData(req.body, signUpSc)
      .then((user) => { 
        return bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) => addUser(user.email, hash))
        .then((user) => jwt.sign(user.rows[0], process.env.PRIVATEKEY));
      })
      .then((token) => res.cookie('city', token))
      .then(() => res.redirect('/cities'))
      .catch((err) => res.send(`<h4> ${err} worng</h4>`));
  }
};
