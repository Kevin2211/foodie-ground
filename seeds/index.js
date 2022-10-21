
const mongoose = require('mongoose')
const Campground = require('../models/campground')

const cities = require('./cities')
const {places, descriptors } = require('./seedHelpers')


//connect mongoose to server
mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})

//get random element from the array function
const sample = (array) => array[Math.floor(Math.random() * array.length)]


//function to seed the database
const seedDb = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 5; i++) {
        const random1000 = Math.floor(Math.random()*1000)
        const camp = new Campground({
            owner: '634db8e891ef126607f47cd9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: 'https://res.cloudinary.com/dckddk4fm/image/upload/v1666223364/FoodieGround/rysoirwxykwkkbyik8yy.jpg',
                fileName: 'FoodieGround/rysoirwxykwkkbyik8yy'
              },
              {
                url: 'https://res.cloudinary.com/dckddk4fm/image/upload/v1666223364/FoodieGround/u6fn8munznei3kympwkn.jpg',
                fileName: 'FoodieGround/u6fn8munznei3kympwkn',
              }],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur impedit itaque accusantium odit aut harum voluptate ipsum, illo modi. Dignissimos, assumenda architecto. Itaque animi laborum voluptatum ducimus nesciunt. Incidunt, dolor.',
            price: 20.99
        })
        await camp.save()
    }
}



seedDb().then(() => mongoose.connection.close())