const Joi = require('@hapi/joi'); 
exports.signUpSc =
  Joi.object().keys({
    email: Joi.string().email().invalid('<','>').required(),
    password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9])/).invalid('<','>').required(),
    confirmPass: Joi.any().valid(Joi.ref('password')).required(),
  });

exports.loginSc = 
  Joi.object().keys({
    email: Joi.string().email().invalid('<','>').required(),
    password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9])/).invalid('<','>').required(),
  });
