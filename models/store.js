const mongoose = require('mongoose')
const { storeSchema: storeSchema } = require('../schemaJoi')
const review = require('./review')
const Schema = mongoose.Schema
const menu = require('./menu')


const ImageSchema = new Schema({
    url: String,
    fileName: String
})

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200')
})
const StoreSchema = new Schema({
    title: String,
    images: [
        ImageSchema
    ],
    hours: [

    ],
    description: String,
    location: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }

})

StoreSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
        await menu.deleteOne({
            _id: doc.menu._id
        })
    }

})


module.exports = mongoose.model('Store', StoreSchema)