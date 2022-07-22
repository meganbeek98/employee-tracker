import { createConnection } from 'mysql2';
require('dotenv').config();

// Creates connection functionality for string
const db = createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export default db;