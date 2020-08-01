const mysql = require("mysql");

let connection = mysql.createConnection({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "",
  database: "sql_database",
});

connection.connect(function (error) {
  if (!!error) {
    console.log("Error: Cannot connect to database");
  } else {
    console.log("Connected to database");
  }
});

module.exports = connection;
