const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const profileImage = new Schema({
    url: String,
    fileName: String
})

profileImage.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_50')
})

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profileImage: profileImage,
    email: {
        type: String,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        enum: ['user', 'owner'],
        required: true
    },
    stores: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Store'
        }
    ],
    favoriteStores: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Store'
        }
    ]
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)