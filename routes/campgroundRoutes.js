const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const { campgroundSchema } = require('../schemaJoi')
const { isLoggedIn, isOwner } = require('../middleware')
const {  campgrounds, newCampgroundPost, showCampground, deleteCampground, editCampgroundGet, editCampgroundPost} = require('../controllers/campgroundController')
var multer = require('multer')
const { storage } = require('../cloudinary')
var upload = multer({storage})
//validation middle ware
const validateCampground = function (req,res,next) {
    const {error} = campgroundSchema.validate(req.body)
    if(error){
        req.flash('error', error.message)
        res.redirect('/campgrounds/new')
        throw new ExpressError(error.details.map(e => e.message).join(','), 400)

    }else{
        next()
    }
}

//campground home page
router.get('/', catchAsync (campgrounds))

//create new campground page
router.get('/new', isLoggedIn, (req,res, next) => {res.render('campgrounds/new')})
router.post('/', isLoggedIn, upload.array('image'), validateCampground,catchAsync(newCampgroundPost))
// router.post('/', upload.array('image'),(req,res) => {
//     console.log(req.body, req.files)
//     res.send('upload success')
// })

//show individual campground
router.get('/:id' ,catchAsync (showCampground))
//delete campground
router.delete('/:id', isLoggedIn, isOwner,catchAsync (deleteCampground))

//edit campground
router.get('/:id/edit', isLoggedIn, isOwner ,catchAsync (editCampgroundGet))
router.put('/:id', isLoggedIn, isOwner,upload.array('image'),validateCampground ,catchAsync (editCampgroundPost))




module.exports = router