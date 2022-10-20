const User = require('../models/user')

module.exports.registerUser = async (req,res) => {
    try {
            const { email, username, password } = req.body
    const user = new User({email, username, password})
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err => {
        if(err) return next(err)
        req.flash('success', "Welcome to Campify")
        res.redirect('/campgrounds')
    })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/users/register')
    }

}

module.exports.loginPost = (req, res) => {
    req.flash('success', 'Welcome back')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    console.log('sessionLoginPost: ', req.session)
        delete req.session.returnTo
    res.redirect(redirectUrl)

}

module.exports.logout = (req, res) => {
    req.logout(function(error) {
        if(error){
            return next(error)
        }
        req.flash('success', 'Successfully logged out!')
        res.redirect('/campgrounds')
    })

}