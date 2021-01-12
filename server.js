var express = require('express');
var bodyParser = require('body-parser');
var BASE_API_PATH = "/api/v1";
const Package = require ('./packages');



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
            res.send(packages.map((paackage) => {
                return paackage.cleanup();
    
            }));
        }
    });

});
// METODO POST PARA CREAR ELEMENTOS DE PAQUETE
app.post(BASE_API_PATH + "/packages",(req, res) => {
    console.log(Date() + " - POST / packages");
    var paackage= req.body;
    Package.create(paackage, (err) => {
        if(err){
           console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
   
});



app.put(BASE_API_PATH + "/packages/:id",(req,res)=>{
    console.log(Date() + " - PUT /packages/" + req.params.id);
    Package.findOne({_id: req.params.id}, (err, paackage)=>{
        if(err){
            console.log(Date()+ " - "+err);
            res.sendStatus(500);
        }else if(!paackage){
            console.log(Date()+" - PUT /packages/"+req.params.id + " Error: package not found");
            res.sendStatus(404);
        }else{
            paackage.code= req.body.code;
            paackage.quantity= req.body.cuantity;
            paackage.delivery_date= req.body.delivery_date;
            paackage.order= req.body.order;
                  

            paackage.save((err, paackage) =>{
                if(err){
                    console.log(Date()+ " - "+err);
                    res.status(500);
                }else{
                    console.log(Date()+" - PUT /packages/"+req.params.id + " package have been updated");
                    res.status(200);
                    return res.send(paackage.cleanup());
                }
            })
        }
        
    })
});


// METODO DELETE PARA BORRAR TODOS LOS REGISTROS INGRESADOS CON POST


app.delete(BASE_API_PATH + "/packages", (req, res) => {
    console.log(Date() + "- DELETE /packages");
    Package.deleteMany({}, {multi: true}, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});


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