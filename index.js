var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require('nedb');

var port = 4050;
var BASE_API_PATH = "/api/v1";
var_DB_FILE_NAME =__dirname + "/Packages.json";

console.log("starting API server...");

var app= express();
app.use(bodyParser.json());

var db = new DataStore({
    filename: DB_FILE_NAME,
    autoload: true
});

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_API_PATH + "/packages", (req, res) => {
    console.log(Date() + " - GET /packages");
    res.send([]);
});

app.post(BASE_API_PATH + "/packages",(req, res) => {
    console.log(Date() + " - POST / packages");
    var package= req.body;
    db.insert(package, (err) => {
        if(err){
           console.log(Date() + "-" + err);
            res.sendStatus(500);
    } else {
            res.sendStatus(201);
    }
    });
   
});



app.listen(port);

console.log("Server ready!"); 
