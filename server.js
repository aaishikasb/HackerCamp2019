const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

//MySQL Connection
let connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "dwN1LRFz3o",
  password: "VlKZzUmXTa",
  database: "dwN1LRFz3o"
});

app.use(express.static(__dirname + "/res")); //Defining where the index.html and its files lie
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Login API
app.post("/login", function(req, res) {
  let username = req.body.user;
  let password = req.body.pass;

  let hash = "";

  connection.query("SELECT * FROM `auth` WHERE `user`=?", [username], function(
    err,
    result
  ) {
    if (err) throw err;
    hash = result[0].pass;

    if (bcrypt.compareSync(password, hash)) {
      res.redirect("http://localhost:4200");
    } else {
      res.send("Login failed");
    }
  });
});

// CHart API
app.get ("/chartapi", function(req,res){
  connection.query("SELECT * FROM `chart` ORDER BY `row` DESC LIMIT 1",function(err,result,field){
    res.send(result[0]);
  });
});

app.post("/piapi", function(req, res) {
  let data = req.body;
  console.log(data);
  res.send("OK");
});

//Get Function for Login Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});


// Listening on Port 8000
app.listen(8000, function(err) {
  if (err) {
    console.log(err);
    console.log(
      chalk.bgRed("Error Encountered. Read the above logs for details")
    );
  }
  console.log(
    chalk.bgGreen.yellowBright.bold(
      "Server listening on Port 8000. The local server is http://127.0.0.1:8000"
    )
  );
});
