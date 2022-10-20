const Campground = require('../models/campground')

module.exports.campgrounds = async (req,res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
}

module.exports.newCampgroundPost = async (req,res,next) => {
    
    const {title, location, price, description} = req.body.campground
    const images = req.files.map(e => ({ url: e.path, fileName: e.filename}))
    const newCampground = new Campground({title, location, images, price, description})

    newCampground.owner = req.user._id
    await newCampground.save()
    console.log(newCampground)
    req.flash('success', 'Successfully made a new campground')
    res.redirect(`/campgrounds/${newCampground._id}`)
}

module.exports.showCampground = async (req,res) => {
    const {id} = req.params
    const foundCampground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: 'user'}).populate('owner')

    if(!foundCampground){
        req.flash('error', `Campground doesn't exist!`)
        return res.redirect('/campgrounds')
    }
    const reviews = foundCampground.reviews
    res.render('campgrounds/show', {foundCampground , reviews})
}

module.exports.deleteCampground = async (req,res) => {
    const id = req.params.id
    const product = await Campground.findByIdAndDelete(id)
    res.redirect(`/campgrounds`)
}

module.exports.editCampgroundGet = async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
}
module.exports.editCampgroundPost = async (req,res) => {

    const images = req.files.map(e => ({ url: e.path, fileName: e.filename}))
    const campground = await Campground.findByIdAndUpdate(req.params.id , {...req.body.campground})
    campground.images.push(...images)
    await campground.save()
    if(req.body.deleteImages){
       await campground.updateOne({ $pull: {images: { fileName: { $in: req.body.deleteImages}}}})
        console.log(campground.images)
        console.log(req.body.deleteImages)
    }

    res.redirect(`/campgrounds/${req.params.id}`)
}