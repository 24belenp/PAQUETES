var express = require('express');
var bodyParser = require('body-parser');
var BASE_API_PATH = "/api/v1";
const Package = require ('./packages');



var app= express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
//res.send("<html><body><h1>My server</h1></body></html>");});
res.send("<html><body><h1>Packages V2 - Online Store</h1></body></html>");
});
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
//app.put(BASE_API_PATH + "/packages" + "/:code" ,(req, res) => {
  //  var actu = req.params.code; 
    //console.log(Date() + " - PUT /packages ");
     //var package= req.body.quanty;
     //Package.updateOne({code: actu},{$set:{quanty:package }},{multi:true}, (err) => {
       //if(err){
         //   console.log(Date() + "-" + err);
           // res.sendStatus(500);
        //} else {
          //   res.sendStatus(201);
            //console.log("Se actualizo correctamente")
        //}
    //});

//});

app.put(BASE_API_PATH + "/packages/:id",(req,res)=>{
    console.log(Date() + " - PUT /packages/" + req.params.id);
    package.findOne({_id: req.params.id}, (err, package)=>{
        if(err){
            console.log(Date()+ " - "+err);
            res.sendStatus(500);
        }else if(!package){
            console.log(Date()+" - PUT /packages/"+req.params.id + " Error: package not found");
            res.sendStatus(404);
        }else{
            package.code= req.body.code;
            package.quantity= req.body.cuantity;
            package.delivery_date= req.body.delivery_date;
            package.order= req.body.order;
                  

            package.save((err, package) =>{
                if(err){
                    console.log(Date()+ " - "+err);
                    res.status(500);
                }else{
                    console.log(Date()+" - PUT /packages/"+req.params.id + " package have been updated");
                    res.status(200);
                    return res.send(package.cleanup());
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