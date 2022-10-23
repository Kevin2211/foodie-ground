const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({

    items: [
        {
            dishName: String,
            price: Number,
            category: {
                type: String,
                enum: ['appetizers', 'desserts', 'drinks', 'main dish']
            } 
        }
    ],
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }
})



module.exports = mongoose.model('Menu', menuSchema)