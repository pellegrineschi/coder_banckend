const{connection} = require('./database/connection');
const express = require('express');

const app = express();



app.listen(8080,() =>{
        console.log('server runing on port 8080');
        connection();
    })