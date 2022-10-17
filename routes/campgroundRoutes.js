const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const { campgroundSchema } = require('../schemaJoi')


//validation middle ware
const validateCampground = function (req,res,next) {
    const {error} = campgroundSchema.validate(req.body)
    if(error){
        throw new ExpressError(error.details.map(e => e.message).join(','), 400)
    }else{
        next()
    }
}



//campground home page
router.get('/', catchAsync (async (req,res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
}))

//create new campground page
router.get('/new', (req,res, next) => {
    res.render('campgrounds/new')
})
router.post('/', validateCampground ,catchAsync(async (req,res,next) => {
    
    const {title, location, image, price, description} = req.body.campground
    console.log(req.body.campground)
    const newCampground = new Campground({title, location, image, price, description})
    await newCampground.save()
res.redirect(`/campgrounds/${newCampground._id}`)
})
)

//show individual campground
router.get('/:id', catchAsync (async (req,res) => {
    const {id} = req.params
    const foundCampground = await Campground.findById(id).populate('reviews')
    const reviews = foundCampground.reviews
    res.render('campgrounds/show', {foundCampground , reviews})
}))
//delete campground
router.delete('/:id', catchAsync (async (req,res) => {
    const id = req.params.id
    const prodcut = await Campground.findByIdAndDelete(id)
    res.redirect(`/campgrounds`)
}))

//edit campground
router.get('/:id/edit' ,catchAsync (async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
}))
router.put('/:id', validateCampground ,catchAsync (async (req,res) => {
    await Campground.findByIdAndUpdate(req.params.id , {...req.body.campground})
    res.redirect(`/campgrounds/${req.params.id}`)
}))




module.exports = router