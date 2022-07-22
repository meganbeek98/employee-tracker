const mysql = require('mysql2');

// Loads the .env file
require('dotenv').config();

// Creates string connection functionality
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,     // this line is important
})


module.exports = db;

// added next 2 lines for testing
const fs = require('fs')
const bcrypt = require('bcrypt');
const { setDefaultResultOrder } = require('dns');

// Reads the SQL seed query
const seedQuery = fs.readFileSync("db/seed.sql", {
  encoding: "utf-8"
})

// Creates string connection functionality
const connection = mysql.createConnection("db/seed.sql" ,{
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,     // this line is important
})

const psw = Math.random()
  .toString(36)
  .substring(2)
const hash = bcrypt.hashSync(psw, 10)

console.log("Running SQL seed...")

// RUN seed query
connection.query(seedQuery, [hash], err => {
  if(err) {
    throw err
  }
})

console.log("SQL seed completed! Password for initial admin account: "  + psw)
connection.end()