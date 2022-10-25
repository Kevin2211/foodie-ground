const Menu = require('../models/menu')
const Store = require('../models/store')
const {cloudinary} = require('../cloudinary/index')
const User = require('../models/user')



module.exports.stores = async (req,res) => {
    const stores = await Store.find({})
    res.render('stores/index', {stores: stores})
}

module.exports.newStorePost = async (req,res,next) => {

    const {title, location, hours, description} = req.body.store

    const images = req.files.map(e => ({ url: e.path, fileName: e.filename}))

    const newStore = new Store({title, location, images, hours, description})
    const menu = new Menu({ items: req.body.menu, store: newStore._id})
    const user = await User.findById(req.user._id)

    await menu.save()

    newStore.menu = menu._id
    newStore.owner = req.user._id

    user.stores.push(newStore)

    await user.save()
    await newStore.save()

    req.flash('success', 'Successfully made a new store')
    res.redirect(`/stores/${newStore._id}`)
}

module.exports.showStore = async (req,res) => {
    const {id} = req.params
    const foundStore = await Store.findById(id).populate({
        path: 'reviews',
        populate: 'user'}).populate('owner').populate('menu')

    if(!foundStore){
        req.flash('error', `Store doesn't exist!`)
        return res.redirect('/stores')
    }
    const reviews = foundStore.reviews
    res.render('stores/show', {foundStore , reviews})
}

module.exports.deleteStore = async (req,res) => {
    const id = req.params.id
    const product = await Store.findById(id)
    if(product.images.length != 0){
        for(let image of product.images){
            await cloudinary.uploader.destroy(image.fileName)
        }
    }
    await Store.findByIdAndDelete(req.params.id)
    res.redirect('/stores')
}

module.exports.editStoreGet = async (req,res) => {
    const store = await Store.findById(req.params.id)
    res.render('stores/edit', {store: store})
}
module.exports.editStorePost = async (req,res) => {

    const images = req.files.map(e => ({ url: e.path, fileName: e.filename}))
    const store = await Store.findByIdAndUpdate(req.params.id , {...req.body.store})
    store.images.push(...images)
    await store.save()
    if(req.body.deleteImages){
        for(let fileName of req.body.deleteImages){
            await cloudinary.uploader.destroy(fileName)
        }
       await store.updateOne({ $pull: {images: { fileName: { $in: req.body.deleteImages}}}})
    }

    res.redirect(`/stores/${req.params.id}`)
}

module.exports.editMenuGet = async (req,res) => {
    const menu = await Menu.findById(req.params.menuId)

    res.render('menu/edit', { menu })
}
module.exports.editMenuPost = async (req,res) => {
    const items = []
    for(let key in req.body.menu){
        items.push(req.body.menu[key])
    }
    const menu = await Menu.findByIdAndUpdate(req.params.menuId, { items: items})
    menu.save()
    req.flash('success', "Successfully edited menu!")
    res.redirect(`/stores/${req.params.id}`)
}

