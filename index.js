const{connection} = require('./database/connection');
const express = require('express');
const cors = require('cors');
const handlebars = require('express-handlebars');

const app = express();
const port = 8080;

//motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

//public
app.use(express.static(__dirname+'public'));

app.use(cors());
// covertir body a objeto js
app.use(express.json());// recibir datos con conten-type app/json
app.use(express.urlencoded({extended:true})); //form-urlencoded

//crear rutas
const routesProducts = require('./routes/product.routes');
//cargando rutas
app.use('/api',routesProducts);


app.listen(port,() =>{
        console.log('server runing on port 8080');
        connection();
    })