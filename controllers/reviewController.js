const Review = require('../models/review')
const Campground =require('../models/campground')

module.exports.newReviewPost = async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    const newReview = new Review(req.body.review)
    newReview.user = req.user._id
    campground.reviews.push(newReview)
    await newReview.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReviewPost = async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    const review = await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/${id}`)

}

