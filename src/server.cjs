const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
// talvez seja necessário trocar o require das importaçõs para import

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5173, () => {
  console.log("Server is running on port 5173");
});

require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.error("Database connection failed:", error.stack);
    return;
  }

  console.log("Connected to the database.");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      console.error("Bcrypt hashing failed:", error.stack);
      return;
    }

    const sqlInsert =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, hash], (error, result) => {
      if (error) {
        console.error("Database insertion failed:", error.stack);
        return;
      }

      res.send("User registered successfully.");
    });
  });
});
