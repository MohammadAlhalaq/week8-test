// Write a query to get the user and their password from the database
const dbConnection = require('../config/connection');

exports.getUser = (email) => {
  return dbConnection
    .query('SELECT * FROM users WHERE $1 = users.email;', [email]);
};