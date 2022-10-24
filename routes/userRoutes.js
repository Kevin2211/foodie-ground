const express = require('express')
const router = express.Router()
const password = require('passport')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const { registerUser, loginPost, logout, showUserGet, showUserStore, showFavorites, addFavorites, removeFavorites } = require('../controllers/userController')
var multer = require('multer')
const { storage } = require('../cloudinary')
var upload = multer({storage})
const { isLoggedIn } = require('../middleware')

router.get('/register',(req,res) => {res.render('users/register')})

router.post('/register', upload.single('image'),catchAsync(registerUser))

router.get('/login', (req, res) => {res.render('users/login')})

router.post('/login', password.authenticate('local',{failureFlash: true, failureRedirect: '/users/login', keepSessionInfo:true}), loginPost)

router.get('/logout', logout)

router.get('/:id/mystores', isLoggedIn, catchAsync(showUserStore))

router.get('/:id/favorites', isLoggedIn, catchAsync(showFavorites))
router.get('/:id/favorites/:storeId', isLoggedIn, catchAsync(addFavorites))
router.get('/:id/favorites/:storeId/remove', isLoggedIn, catchAsync(removeFavorites))


router.get('/:id', catchAsync(showUserGet))

module.exports = router