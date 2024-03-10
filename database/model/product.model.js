const {Schema, model} = require('mongoose');

const ProducSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    category:{
        type: String,
        require: true,
        enum: ['Hogar','Cocina','Audio']
    },
    stock:{
        type: Number,
        default: 10    
    },
    image:{
        type: String,
        default: 'defaul.png'
    }
})

module.exports = model('modelProduct',ProducSchema);