const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const { title } = require('process')


//connect mongoose to server
mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})

//method override
app.use(methodOverride('_method') )

//set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//To parse request body
app.use(express.urlencoded({extended: true}))

// Morgan logger
app.use(morgan('tiny'))
app.engine('ejs', ejsMate)

//home route
app.get('/', (req,res) => {
 res.render('home')
})

app.get('/campgrounds', async (req,res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})


//create new campground
app.get('/campgrounds/new', (req,res, next) => {
    res.render('campgrounds/new')
})
app.post('/campgrounds', async (req,res,next) => {
    try {
        const {title, location, image, price, description} = req.body.campground
        console.log(req.body.campground)
        const newCampground = new Campground({title, location, image, price, description})
        await newCampground.save()
    res.redirect(`/campgrounds/${newCampground._id}`)
    } catch (error) {
        next(error)
    }

})

app.get('/campgrounds/:id', async (req,res) => {
    const {id} = req.params
    const foundCampground = await Campground.findById(id)
    res.render('campgrounds/show', {foundCampground})
})
app.delete('/campgrounds/:id', async (req,res) => {
    const id = req.params.id
    const prodcut = await Campground.findByIdAndDelete(id)
    res.redirect(`/campgrounds`)
})

app.get('/campgrounds/:id/edit', async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})

app.put('/campgrounds/:id', async (req,res) => {
    await Campground.findByIdAndUpdate(req.params.id , {...req.body.campground})
    res.redirect(`/campgrounds/${req.params.id}`)
})

app.use((err, req ,res, next) => {
    res.send('Oh boiiiii')
})


app.listen(3000, () => {
    console.log('Listening on port 3000')
})