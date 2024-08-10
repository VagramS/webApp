const { Client } = require("pg");
//const fs = require("fs");
//const dbFile = "app/Utils/db/webApp.json";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "webApp",
  password: "postgres",
  port: 5432,
});

function connectToPostgreSQL() {
  client.connect(function (err) {
    if (err) console.error("Connection error", err.stack);
    else console.log("Connected to postgreSQL");
  });
}

module.exports = { connectToPostgreSQL };
