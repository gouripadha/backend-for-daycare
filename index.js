// create an exprss server
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// make connection to mysql database
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "daycare",
});

app.use("/api/auth/", require("./routes/auth"));
