var express = require('express');
var bodyParser = require('body-parser');
var BASE_API_PATH = "/api/v1";
const Package = require ('./packages');
const passport = require('passport')
const OrdersResource = require('./ordersResource');
require('./passport.js');


var app= express();
app.use(bodyParser.json());
app.use(passport.initialize());



app.get("/",
passport.authenticate('localapikey', {session: false}),
(req, res) => {
res.send("<html><body><h1>PACKAGES</h1></body></html>");
});

// METODO GET PARA CONSULTAR ELEMENTOS DE PAQUETE
app.get(BASE_API_PATH + "/packages", 
passport.authenticate('localapikey', {session:false}),
(req, res) => {
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



app.put(BASE_API_PATH + "/packages/:code",(req,res)=>{
    console.log(Date() + " - PUT /packages/" + req.params.code);
    Package.findOne({code: req.params.code}, (err, paackage)=>{
        if(err){
            console.log(Date()+ " - "+err);
            res.sendStatus(500);
        }else if(!paackage){
            console.log(Date()+" - PUT /packages/"+req.params.code + " Error: package not found");
            res.sendStatus(404);
        }else{
            paackage.code= req.body.code;
            paackage.quantity= req.body.quantity;
            paackage.delivery_date= req.body.delivery_date;
            paackage.statuss= req.body.statuss;
                  

            paackage.save((err, paackage) =>{
                if(err){
                    console.log(Date()+ " - "+err);

                    res.status(500);
                }else{
                    console.log(Date()+" - PUT /packages/"+req.params.code + " package have been updated");
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



//intregracion con Orders

app.get(BASE_API_PATH+ "/orders", (req,response)=>{
  console.log("GET /orders");

    OrdersResource.getAllOrders()
        .then((body)=>{
            response.send(body);
        })
        .catch((error)=>{
            console.log("error: "+error);
            response.sendStatus(500);
        })

        
});

////intregracion con clientes

app.put(BASE_API_PATH + "/packages/:code",(req,res)=>{
    console.log(Date() + " - PUT /packages/" + req.params.code);
    Package.findOne({code: req.params.code}, (err, paackage)=>{
        if(err){
            console.log(Date()+ " - "+err);
            res.sendStatus(500);
        }else if(!paackage){
            console.log(Date()+" - PUT /packages/"+req.params.code + " Error: package not found");
            res.sendStatus(404);
        }else{
            
            paackage.statuss= req.body.statuss;
                  

            Package.save((err, paackage) =>{
                if(err){
                    console.log(Date()+ " - "+err);

                    res.status(500);
                }else{
                    console.log(Date()+" - PUT /packages/"+req.params.code + " status have been updated");
                    res.status(200);
                    return res.send(paackage.cleanup());
                }
            })
        }
        
    })
});

//app.put(BASE_API_PATH+ "/clients/:cif/update", (req,response)=>{

  //  console.log("update status");
    //var data= req.body;

    //ClientsResource.putStockProveedor(req.params.cif, data)
      //  .then((body)=>{
        //    response.send(body);
        //})
        //.catch((error)=>{
          //  console.log("error: "+error);
            //response.sendStatus(500);
        //})
//});

module.exports = app;