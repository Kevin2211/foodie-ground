
const Campground = require('./models/campground')
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {

        console.log('session: ', req.session)
        req.flash('error', 'You must be signed in first!')
        return res.redirect('/users/login')
    }
    next()
}

module.exports.isOwner = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
    if(!campground.owner._id.equals(req.user._id)){
        req.flash('error', `You're not the owner of this campground`)
        return res.redirect(`/campgrounds/${req.params.id}`)
    }
    next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId)
    if(!review.user._id.equals(req.user._id)){
        req.flash('error', `You don't have permission`)
        return res.redirect(`/campgrounds/${req.params.id}`)
    }
    next()
}