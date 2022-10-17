const express = require('express')
const router = express.Router({mergeParams: true})

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Review = require('../models/review')
const Campground =require('../models/campground')
const { reviewSchema } = require('../schemaJoi')


//validate review middleware
const validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error){
        throw new ExpressError(error.details.map(e => e.message).join(','), 400)
    }else{
        next()
    }
}

router.post('/', validateReview ,catchAsync( async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    const newReview = new Review(req.body.review)
    campground.reviews.push(newReview)
    await newReview.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    const review = await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/${id}`)

}))

module.exports = router