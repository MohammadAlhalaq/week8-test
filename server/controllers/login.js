const { join } = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');

const { loginSc } = require('./schema');
const { getUser } = require('../database/queries/getUser');
const { validatePostData } = require('./auth');

exports.renderLogin = (req, res) => {
  if (req.logedIn) {
    res.redirect('/cities');
  } else {
    res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
  }
};

exports.postLogin = (req, res) => {
  if (req.logedIn) {
    res.redirect('/cities');
  } else {
    validatePostData(req.body, loginSc)
      .then((userValid) => {        
        return getUser(userValid.email)})
      .then((user) => {
        return bcrypt.compare(req.body.password, user.rows[0].password)
          .then(() => {
          const { email, id } = user.rows[0];
          const token = jwt.sign({ email, id }, process.env.PRIVATEKEY);
          res.cookie('city', token);
        })
      })
      .then(() => res.redirect('/cities'))
      .catch((err) => res.send(`<h4> ${err} worng</h4>`));
  }
};