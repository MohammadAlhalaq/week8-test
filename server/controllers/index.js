const express = require('express');

const { client, server } = require('./error');
const { getAllCities, renderCities, add } = require('./city');
const { renderSignup, postSignUp } = require('./signup');
const { postLogin, renderLogin } = require('./login');
const { isAuth } = require('./auth');
const { logout } = require('./logout');
const router = express.Router();

router.use(isAuth);
router.route('/login').get(renderLogin).post(postLogin);
router.route('/signup').get(renderSignup).post(postSignUp);

router.get('/cities', renderCities);
router.get('/all-cities', getAllCities);
router.post('/add-city', add);
router.get('/logout', logout);

router.use(client);
router.use(server);

module.exports = router;
