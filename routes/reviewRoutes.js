const express = require('express')
const router = express.Router({mergeParams: true})

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const { reviewSchema } = require('../schemaJoi')
const { isLoggedIn, isReviewAuthor } = require('../middleware')
const { newReviewPost, deleteReviewPost } = require('../controllers/reviewController')


//validate review middleware
const validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error){
        throw new ExpressError(error.details.map(e => e.message).join(','), 400)
    }else{
        next()
    }
}

router.post('/', isLoggedIn,validateReview ,catchAsync( newReviewPost))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(deleteReviewPost))

module.exports = router