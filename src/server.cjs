const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// talvez seja necessário trocar o require das importaçõs para import

const app = express();

function sendEmail(to, subject, text) {
  var transporter = nodemailer.createTransport({
      // host: "sandbox.smtp.mailtrap.io",
      host: "mail.smtpbucket.com",
      port: 8025,
      // auth: {
      //     user: process.env.MAILTRAP_USER,
      //     pass: process.env.MAILTRAP_PASS,
      // },
  });

  let mailOptions = {
    from: "testecefet@mail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
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
      sendEmail(
        email,
        "Bem-vindo ao nosso site!",
        "Obrigado por se registrar."
      );
      res.send("User registered successfully.");
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sqlSelect = "SELECT * FROM users WHERE email = ?";
  db.query(sqlSelect, [email], (error, result) => {
    if (error) {
      console.error("Database selection failed:", error.stack);
      return;
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          res.send({ loggedIn: true, user: result[0] });
        } else {
          res.send({
            loggedIn: false,
            message: "Wrong username/password combination!",
          });
        }
      });
    } else {
      res.send({ loggedIn: false, message: "User doesn't exist" });
    }
  });
});

// postman get http://localhost:3000/users
app.get("/users", (req, res) => {
    const sqlSelect = "SELECT name FROM users";
    db.query(sqlSelect, (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            res.status(500).send("Failed to retrieve users");
            return;
        }
        res.json(result);
    });
});

// Buscar todos os problemas
app.get("/problems", async (req, res) => {
  const sqlSelect = "SELECT * FROM problems";
  db.query(sqlSelect, (error, result) => {
      if (error) {
          console.error("Database selection failed:", error.stack);
          res.status(500).send("Failed to retrieve problems");
          return;
      }
      res.json(result);
  });
});