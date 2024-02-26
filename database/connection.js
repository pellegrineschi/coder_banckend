const mongoose = require('mongoose');

const connection = async() =>{
    try{
        await mongoose.connect('mongodb+srv://pellegrineschi86:1307tobias@proyectocoder.8zy159q.mongodb.net/');

        console.log('conectado correctamente a la base de datos');

    } catch(error){
        console.log(error);
        throw new Error ('no se a podido conectar a la base de datos');
    }
}

module.exports = {
    connection
}