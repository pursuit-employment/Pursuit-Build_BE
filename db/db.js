const pgp = require('pg-promise')();
require('dotenv').config();

// Database connection details
const connection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

// Create a new database instance from the connection details
const db = pgp(connection);

module.exports = db;
