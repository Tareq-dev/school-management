import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  // host: 'b96ip6k2kj3trooxrkhi-mysql.services.clever-cloud.com',
  // user: 'ua66pzpagztoo011',
  // password: '6cqywLmWzrrt33gQke1y',
  // database: 'b96ip6k2kj3trooxrkhi',
  // port: 3306,
  host: '127.0.0.1',
  user: 'root',
  database: 'school_management',
});

db.getConnection(function (err, conn) {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("✅ Successfully connected to the database...");
  conn.release();
});

export default db;
