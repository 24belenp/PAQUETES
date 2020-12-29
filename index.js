var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require('nedb');

var port = 4050;
var BASE_API_PATH = "/api/v1";
var DB_FILE_NAME= __dirname + "/packages.json";

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

// METODO GET PARA CONSULTAR ELEMENTOS DE PAQUETE

app.get(BASE_API_PATH + "/packages", (req, res) => {
    console.log(Date() + " - GET /packages");
    db.find({},(err, packages) =>{
        if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
            res.send(packages.map((package) => {
                delete package._id;
                return package;
            }));
        }
    });

});
// METODO POST PARA CREAR ELEMENTOS DE PAQUETE
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

//METODO PUT PARA ACTUALIZAR ELEMENTOS DE PAQUETE
app.put(BASE_API_PATH + "/packages" + "/:code" ,(req, res) => {
    var actu = req.params.code; 
    console.log(Date() + " - PUT /packages ");
     var package= req.body.quanty;
    db.update({code: actu},{$set:{quanty:package}},{multi:true}, (err) => {
       if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
             res.sendStatus(201);
        }
    });

});


// METODO DELETE PARA BORRAR TODOS LOS PAQUETES
app.delete(BASE_API_PATH + '/packages', (req, res)=>{
    //var producte = productes.find(a =>a.categoria===parseInt(req.params.categoria));
    //var index =productes.indexOf(producte);
    //productes.splice(index, 1);
    //res.send()
    db.remove({},{multi:true},(err)=>{

        if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
             res.sendStatus(200);
        }

    
    })  

})


//METODO DELETE PARA BORRRAR ELEMENTOS DE PAQUETE
app.delete(BASE_API_PATH + "/packages" + "/:code" ,(req, res) => {
    var actu = req.params.code; 
    console.log(Date() + " - DELETE /packages ");
     
    db.remove({code: actu}, (err) => {
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
