const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

const dbFile = 'app/Utils/db/webApp.json';

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

function connectToPostgreSQL() {
  client.connect((err) => {
    if (err)
      console.error('Connection error', err.stack);
    else
      console.log('Connected to postgreSQL');
  });
}

module.exports = { connectToPostgreSQL };
