const Store = require('../models/store')
const User = require('../models/user')

module.exports.registerUser = async (req,res) => {
    try {
    const { firstName,lastName, email, username, password, accountType } = req.body
    const user = new User({firstName,lastName,email, username, password, accountType})


    
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
        req.flash('success', "Welcome to Foodie Ground!")
        res.redirect('/stores')
    })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/users/register')
    }

}

module.exports.loginPost = (req, res) => {
    req.flash('success', `Welcome back ${req.user.firstName}` )
    const redirectUrl = req.session.returnTo || '/stores'
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
        res.redirect('/stores')
    })

}
module.exports.showUserGet = async (req,res) => {
    const user = await User.findById(req.params.id)
    res.render('users/showUser', { user })
}

module.exports.showUserStore = async (req,res) => {
    const id = req.params.id
    const user = await User.findById(id).populate('stores')
    console.log('stores',user.stores)

    res.render('users/myStores', { user })
}



module.exports.showFavorites = async (req,res) => {
    const id = req.params.id
    const user = await User.findById(id).populate('favoriteStores')
    res.render('users/favorites', { user })
}

module.exports.addFavorites = async (req,res) => {
    const store = await Store.findById(req.params.storeId)
    const user = await User.findById(req.params.id)

    user.favoriteStores.push(store)
    await user.save()
    req.flash('success', 'Saved to favorites!')
    res.redirect(`/stores/${req.params.storeId}`)
}

module.exports.removeFavorites = async (req,res) => {
    const store = await Store.findById(req.params.storeId)
    const user = await User.findById(req.params.id)

    user.favoriteStores.pop(store)
    await user.save()
    req.flash('error', 'Removed from favorites!')
    res.redirect(`/stores/${req.params.storeId}`)
}