// Write a query to add the user and their password to the database
const dbConnection = require('../config/connection');

exports.addUser = (email, password) => {
  return dbConnection
    .query('INSERT INTO users (email, password) VALUES($1, $2) RETURNING *;',[email, password]);
}