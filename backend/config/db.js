const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();
// const db = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "whatsbulk",
// });
const db = mysql.createPool({
  host: 'bgkrrkork2wrdmbwrahl-mysql.services.clever-cloud.com',
  user: 'ufqmzsak0yjgvp2f',
  password: 'St7nyBHda4G8FsBVI6qA',
  database: 'bgkrrkork2wrdmbwrahl',
  port: 3306,
});

// db.getConnection(function (err, conn) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Successfully connect to the database...");
//   db.releaseConnection(conn);
// });

db.getConnection(function (err, conn) {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Successfully connected to the database...");
  // Release the connection after using it
  conn.release();
});
 

module.exports = db;
