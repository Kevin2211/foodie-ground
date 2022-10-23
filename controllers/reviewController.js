const Review = require('../models/review')
const Store =require('../models/store')

module.exports.newReviewPost = async (req,res) => {
    const store = await Store.findById(req.params.id)
    const newReview = new Review(req.body.review)
    newReview.user = req.user._id
    store.reviews.push(newReview)
    await newReview.save()
    await store.save()
    res.redirect(`/stores/${store._id}`)
}

module.exports.deleteReviewPost = async (req, res) => {
    const { id, reviewId } = req.params
    await Store.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    const review = await Review.findByIdAndDelete(reviewId)
    res.redirect(`/stores/${id}`)

}

