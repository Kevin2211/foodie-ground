const User = require('../models/user')

module.exports.registerUser = async (req,res) => {
    try {
    const { firstName,lastName, email, username, password } = req.body
    const user = new User({firstName,lastName,email, username, password})
    console.log(req.file)

    
    if( typeof req.file !== "undefined"){
        const image = { url: req.file.path, fileName: req.file.filename }
        user.profileImage = image
    }else{
        const image = { url: 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png', fileName: 'default' }
        user.profileImage = image
    }

    
    const registeredUser = await User.register(user, password)
    console.log(registeredUser)
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
    console.log(req.user)
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