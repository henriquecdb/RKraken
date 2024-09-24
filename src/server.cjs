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

app.post("/submit", async (req, res) => {
    const { code, problemId } = req.body;
    const { exec } = require("child_process");
    let testcases = [];
    const sqlSelect = "SELECT input, output FROM testcases WHERE fk_problem = ?";
    db.query(sqlSelect, [problemId], (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            res.status(500).send("Failed to retrieve testcases");
            return;
        }
        
        if(result.length > 0) {
            console.log(result[0]["input"]);
            const test = result[0];
            console.log(test["output"]);
            testcases = result[0];
            console.log(testcases["input"]);

            //Criando arquivo com o codigo do usuario
            exec(`printf '%s' '${String.raw`${code}`}' > main.cpp`, (error, stdout, stderr) => {
                console.log(code);
                if(error) {
                    console.log(`error: ${error.message}`);
                    return res.json({ success: false, message: error.message});
                }

                if(stderr) {
                    console.log(`stderr: ${stderr}`);
                    return res.json({ success: false, message: stderr});
                }
            });

            //Compilando o arquivo
            exec(`g++ main.cpp`, (error, stdout, stderr) => {
                if(error) {
                    console.log(`error: ${error.message}`);
                    return res.json({ success: true, message: "Compilation Error"});
                }

                if(stderr) {
                    console.log(`stderr: ${stderr}`);
                    return res.json({ success: false, message: stderr});
                }
            });
                    
            
            //Gerando arquivo de entrada
            exec(`printf '%s' '${String.raw`${testcases["input"]}`}' > in`, (error, stdout, stderr) => {
                if(error) {
                    console.log(`error: ${error.message}`);
                    return res.json({ success: false, message: error.message});
                }

                if(stderr) {
                    console.log(`stderr: ${stderr}`);
                    return res.json({ success: false, message: stderr});
                }
            });

            //Gerando arquivo de saida
            exec(`printf '%s' '${String.raw`${testcases["output"]}`}' > out`, (error, stdout, stderr) => {
                if(error) {
                    console.log(`error: ${error.message}`);
                    return res.json({ success: false, message: error.message});
                }

                if(stderr) {
                    console.log(`stderr: ${stderr}`);
                    return res.json({ success: false, message: stderr});
                }
            });
                        
            //Executando o codigo do usuario e guardando a saida
            exec("./a.out < in > saida", (error, stdout, stderr) => {
                if(error) {
                    console.log(`error: ${error.message}`);
                    return res.json({ success: false, message: error.message});
                }

                if(stderr) {
                    console.log(`stderr: ${stderr}`);
                    return res.json({ success: false, message: stderr});
                }
            });

            //Comparando a saida do usuario com a saida do problema
            exec("diff saida out", (error, stdout, stderr) => {
                if(error) {
                    console.log("Failed Testcase");
                    return res.json({success: true, message: "Wrong Answer"});
                }

                if(stderr) {
                    console.log(`stderr: ${stderr}`);
                    return res.json({ success: false, message: stderr});
                }

                if(stdout === "") {
                    console.log("Accepted Testcase");
                    return res.json({success: true, message: "Accepted"});
                } else {
                    console.log("Failed Testcase");
                    return res.json({success: true, message: "Wrong Answer"});
                }
            });
        } else {
            return res.send("No testcase available");
        }
    });
});
    

app.get("/status/:id", async (req, res) => {
    const id = [req.params.id];
    const sqlSelect = "SELECT * FROM solved WHERE fk_user = ?";
    db.query(sqlSelect, [id], (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            res.status(500).send("Failed to retrieve status");
            return;
        }
        res.json(result);
    });
});

app.post("/set-problem-status", (req, res) => {
    const { userId, problemId, status } = req.body;
    
    const sqlSelect = "SELECT * FROM solved WHERE fk_user = ? AND fk_problem = ?";
    db.query(sqlSelect, [userId, problemId], (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            res.status(500).send("Failed to retrieve status");
            return;
        }

        if(result.length > 0) {
            const sqlUpdate = "UPDATE solved SET status = ? WHERE fk_user = ? AND fk_problem = ?";
            db.query(sqlUpdate, [status, userId, problemId], (error, result) => {
                if (error) {
                    console.error(
                        "Database update failed:",
                        error.stack
                    );
                    
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao atualizar status",
                    });
                }

                return res.json({
                    success: true,
                    message: "Status atualizado com sucesso.",
                });
            });
        } else {
            const sqlInsert = "INSERT INTO solved (fk_user, fk_problem, status) VALUES (?, ?, ?)";
            db.query(sqlInsert, [userId, problemId, status], (error, result) => {
                if (error) {
                    console.error(
                        "Database insert failed:",
                        error.stack
                    );

                    return res.status(500).json({
                        success: false,
                        message: "Erro ao inserir novo registro",
                    });
                }
                
                return res.json({
                    success: true,
                    message: "Status inserido com sucesso.",
                });
            });
        }
    });
});


// Buscar os usuarios ordenados por ranking
app.get("/ranking", async (req, res) => {
    const sqlSelect = "select name, count(id) as nsolved from users join solved on users.id = solved.fk_user group by id order by count(id) desc;";
    db.query(sqlSelect, (error, result) => {
        if (error) {
            console.error("Database selection failed:", error.stack);
            res.status(500).send("Failed to retrieve problems");
            return;
        }
        res.json(result);
    });
});