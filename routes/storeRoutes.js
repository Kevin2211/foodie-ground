const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Store = require('../models/store')
const { storeSchema: storeSchema } = require('../schemaJoi')
const { isLoggedIn, isOwner } = require('../middleware')
const {  stores: stores, newStorePost, showStore: showStore, deleteStore: deleteStore, editStoreGet, editStorePost, editMenuGet, editMenuPost} = require('../controllers/storeController')
var multer = require('multer')
const { storage } = require('../cloudinary')
var upload = multer({storage})
//validation middle ware
const validateStore = function (req,res,next) {
    const {error} = storeSchema.validate(req.body)
    if(error){
        req.flash('error', error.message)
        res.redirect('/stores/new')
        throw new ExpressError(error.details.map(e => e.message).join(','), 400)

    }else{
        next()
    }
}

//store home page
router.get('/', catchAsync (stores))

//create new store page
router.get('/new', isLoggedIn, (req,res, next) => {res.render('stores/new')})
router.post('/', isLoggedIn, upload.array('image'), validateStore,catchAsync(newStorePost))
// router.post('/', upload.array('image'),(req,res) => {
//     console.log(req.body, req.files)
//     res.send('upload success')
// })

//show individual store
router.get('/:id' ,catchAsync (showStore))
//delete store
router.delete('/:id', isLoggedIn, isOwner,catchAsync (deleteStore))

//edit store
router.get('/:id/edit', isLoggedIn, isOwner ,catchAsync (editStoreGet))
router.put('/:id', isLoggedIn, isOwner,upload.array('image'),validateStore ,catchAsync (editStorePost))

//edit store's menu
router.get('/:id/menu/:menuId/edit', isLoggedIn, isOwner,catchAsync(editMenuGet))
router.put('/:id/menu/:menuId/edit', isLoggedIn, isOwner,catchAsync(editMenuPost))




module.exports = router