var express = require('express');
var bodyParser = require('body-parser');
var BASE_API_PATH = "/api/v1";
const Package = require ('./package');

var app= express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
res.send("<html><body><h1>My server</h1></body></html>");});

// METODO GET PARA CONSULTAR ELEMENTOS DE PAQUETE
app.get(BASE_API_PATH + "/packages", (req, res) => {
    console.log(Date() + " - GET /packages");

    Package.find({},(err, packages) =>{
        if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
            res.send(packages.map((package) => {
                return package.cleanup();
    
            }));
        }
    });

});
// METODO POST PARA CREAR ELEMENTOS DE PAQUETE
app.post(BASE_API_PATH + "/packages",(req, res) => {
    console.log(Date() + " - POST / packages");
    var package= req.body;
    Package.create(package, (err) => {
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
     Package.updateOne({code: actu},{$set:{quanty:package }},{multi:true}, (err) => {
       if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
             res.sendStatus(201);
            console.log("Se actualizo correctamente")
        }
    });

});




// METODO DELETE PARA BORRAR TODOS LOS REGISTROS INGRESADOS CON POST
app.delete(BASE_API_PATH + '/packages', (req, res)=>{
    
    Package.deleteMany.remove({},{multi:true},(err)=>{

        if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
             res.sendStatus(200);
        }

    
    })  

})


//METODO DELETE PARA BORRRAR UN REGISTRO EN ESPECIFICO POR SU CODE
app.delete(BASE_API_PATH + "/packages" + "/:code" ,(req, res) => {
    var actu = req.params.code; 
    console.log(Date() + " - DELETE /packages ");
     
    Package.deleteOne({code: actu}, (err) => {
       if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
             res.sendStatus(201);
        }
    });

});

module.exports = app;
