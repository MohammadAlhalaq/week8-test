const { join } = require('path');

const { getCities } = require('../database/queries/getCities');
const { addCity } = require('../database/queries/addCity');

exports.renderCities = (req, res) => {
  if(req.logedIn){
    res.sendFile(join(__dirname, '..', '..', 'public', 'cities.html'));
  }else res.redirect('/');
};

exports.getAllCities = (req, res, next) => {
  if(req.logedIn){
    getCities()
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  }else res.redirect('/');
};

exports.add = (req, res, next) => {
  if(req.logedIn){
    const cityInfo = req.body;
    addCity(cityInfo)
      .then(() => res.redirect('/cities'))
      .catch(err => next(err));
  }else res.redirect('/');
};
