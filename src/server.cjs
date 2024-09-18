const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// talvez seja necessário trocar o require das importaçõs para import

const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;
    const emailSubject = `New message from ${name}`;
    const emailText = `You have received a new message from ${name} (${email}):\n\n${message}`;

    sendEmail("contact.rkraken@gmail.com", emailSubject, emailText);
    res.json({ status: "Email sent successfully" });
});

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

    const sqlCheckEmail = "SELECT * FROM users WHERE email = ?";
    db.query(sqlCheckEmail, [email], (error, results) => {
        if (error) {
            console.error("Database query failed:", error.stack);
            return res.status(500).json({success: false, message: "Erro no servidor."});
        }

        if (results.length > 0) {
            return res.status(400).json({success: false, message: "Email já possui cadastro."});
        }

        bcrypt.hash(password, 10, (error, hash) => {
            if (error) {
                console.error("Bcrypt hashing failed:", error.stack);
                return res.status(500).json({success: false, message: "Erro ao criptografar senha."});
            }

            const sqlInsert =
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(sqlInsert, [name, email, hash], (error, result) => {
                if (error) {
                    console.error("Database insertion failed:", error.stack);
                    return res.status(500).json({success: false, message: "Erro ao registrar usuário."});
                }

                sendEmail(
                    email,
                    "Bem-vindo ao nosso site!",
                    "Obrigado por se registrar."
                );
                res.json({success: true, message: "Usuário registrado com sucesso."});
            });
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

// Buscar problema baseado no id
app.get("/problems/:id", async (req, res) => {
    const id = [req.params.id];
    const sqlSelect = "SELECT * FROM problems WHERE id = ?";
    db.query(sqlSelect, [id], (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            res.status(500).send("Failed to retrieve problem");
            return;
        }
        res.json(result);
    });
});

app.post("/recover", (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    const sqlSelect = "SELECT * FROM users WHERE email = ?";
    db.query(sqlSelect, [email], (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            return res
                .status(500)
                .json({ success: false, message: "Erro no servidor." });
        }

        if (result.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Usuário não encontrado." });
        }
        
        bcrypt.hash(newPassword, 10, (error, hash) => {
            if (error) {
                console.error("Bcrypt hashing failed:", error.stack);
                return res.status(500).json({
                    success: false,
                    message: "Erro ao criptografar nova senha.",
                });
            }

            const sqlUpdate =
                "UPDATE users SET password = ? WHERE email = ?";
            db.query(sqlUpdate, [hash, email], (error, result) => {
                if (error) {
                    console.error(
                        "Database update failed:",
                        error.stack
                    );
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao atualizar a senha.",
                    });
                }

                res.json({
                    success: true,
                    message: "Senha alterada com sucesso.",
                });
            });
        });
            
    });
});

app.post("/set-verification-code", (req, res) => {
    const { email, code } = req.body;

    const sqlSelect = "SELECT * FROM users WHERE email = ?";
    db.query(sqlSelect, [email], (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            return res
                .status(500)
                .json({ success: false, message: "Erro no servidor." });
        }

        if (result.length > 0) {
            const sqlUpdate = "UPDATE users SET pwd_ver_code = ? WHERE email = ?";
            db.query(sqlUpdate, [code, email], (error, result) => {
                if (error) {
                    console.error(
                        "Database update failed:",
                        error.stack
                    );
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao gerar codigo de verificacao.",
                    });
                }

                sendEmail(
                    email,
                    "Pedido de alteracao de senha",
                    "Seu codigo de verificacao e: " + code
                );

                res.json({
                    success: true,
                    message: "Codigo de verificacao gerado com sucesso.",
                });
            });
        } else {
            res.json({ success: false, message: "User doesn't exist" });
        }
    });
});

app.get("/get-verification-code/:user", async (req, res) => {
    const email = [req.params.user];
    const sqlSelect = "SELECT pwd_ver_code FROM users WHERE email = ?";
    db.query(sqlSelect, [email], (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            res.status(500).json({ success: false, message: "Failed to retrieve user" });
            return;
        }
        
        console.log();
        
        if(result.length > 0) {
           return res.json({success: true, code: result[0].pwd_ver_code});
        } 
    });
});