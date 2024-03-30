const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const http = require('http');
const app = express();
const port = 8080;
const server = http.createServer(app);
const { Server } = require('socket.io');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');//paquete de Handlebars que permite el acceso a las propiedades del prototipo en las plantillas Handlebars

// Motor de plantillas
const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(require('handlebars'))
});

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Resto del código...


//public
app.use(express.static(__dirname+'/public'));

app.use(cors());
// covertir body a objeto js
app.use(express.json());// recibir datos con conten-type app/json
app.use(express.urlencoded({extended:true})); //form-urlencoded

//crear rutas
const routesProducts = require('./routes/product.routes');
//cargando rutas
app.use('/api',routesProducts);

//socket
const io = new Server(server);
io.on('connection',(socket)=>{
console.log('user conectado');
    
})

server.listen(port,() =>{
        console.log('server runing on port 8080');
        connection();
    });

   