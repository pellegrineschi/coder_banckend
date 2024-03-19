const {Schema, model, default: mongoose} = require('mongoose');

const CartSchema = new Schema({
    date: {
        type: String,
        require : true
    },
    products:{
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'modelProduct'
            }
        }]
    }
})

module.exports = model('modelCart',CartSchema,'cart');