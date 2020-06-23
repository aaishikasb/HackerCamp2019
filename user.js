var bcrypt = require("bcryptjs");
let mysql = require ("mysql");

//MySQL Connection
let connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "dwN1LRFz3o",
    password: "VlKZzUmXTa",
    database: "dwN1LRFz3o"
  });

bcrypt.genSalt(14, function(err, salt) {
  bcrypt.hash("hackercamp123", salt, function(err, hash) {
    connection.query("SELECT * FROM `auth` WHERE `user`=?",["ruddha"],function(err,result,field){
        if (err) throw err;
        console.log(result[0].pass);
    });
    //console.log(hash);
  });
});