import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: [`http://${process.env.FRONTEND_HOST}:8081`],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret", //secret key to encrypt session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    }, //Session cookie properties
  })
);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.ACME_INTERNAL_PASSWORD,
  database: process.env.DB_NAME,
});
// db.connect();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token not okay" });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  console.log(req.username);
  return res.json({ Status: "Success", username: req.username });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ? ";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    console.log(err);
    if (err) return res.json({ Errror: "Log in error server" });
    if (data.length > 0) {
      const username = data[0].username;
      const token = jwt.sign({ username }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      //   console.log(name);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Error: "Wrong email or password" });
    }
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
  console.log(process.env.FRONTEND_HOST);
  // console.log(process.env.ACME_INTERNAL_PASSWORD);
});
