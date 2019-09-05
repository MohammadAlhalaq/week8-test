const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
require('env2')('./config.env');

exports.isAuth = (req, res, next) => 
  jwt.verify(req.cookies.city, process.env.PRIVATEKEY, (err, dataCity) => {
    if (err) {
      req.logedIn = false;
    } else {
      req.logedIn = true;
      req.city = dataCity;
    }
    next();
  });

exports.validatePostData = (data, schema) => Joi.validate(data, schema);
