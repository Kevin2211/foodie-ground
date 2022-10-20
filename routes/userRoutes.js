const express = require('express')
const router = express.Router()
const password = require('passport')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const User = require('../models/user')
const { registerUser, loginPost, logout } = require('../controllers/userController')

router.get('/register', (req,res) => {res.render('users/register')})

router.post('/register', catchAsync(registerUser))

router.get('/login', (req, res) => {res.render('users/login')})

router.post('/login', password.authenticate('local',{failureFlash: true, failureRedirect: '/users/login', keepSessionInfo:true}), loginPost)

router.get('/logout', logout)

module.exports = router