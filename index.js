
const app = require('./server.js');

var port = (process.env.PORT || 4050);

console.log("Starting API server at "+port);


app.listen(port);

console.log("Server ready!");