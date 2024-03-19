const mongoose = require('mongoose');
const Cart = require('../database/model/cart.model');

const connection = async() =>{
    try{
        await mongoose.connect('mongodb+srv://pellegrineschi86:1307tobias@proyectocoder.8zy159q.mongodb.net/ecommerce');

        console.log('conectado correctamente a la base de datos');
        Cart.create({
            date:'19/03/2024'
        })


    } catch(error){
        console.log(error);
        throw new Error ('no se a podido conectar a la base de datos');
    }
}

module.exports = {
    connection
}