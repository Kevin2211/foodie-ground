const Joi = require('joi')

let itemInfo = Joi.object().keys({
        dishName: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required()
})

module.exports.storeSchema = Joi.object({
    store: Joi.object({
        title: Joi.string().required(),
        hours: Joi.array().required(),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array(),
    menu: Joi.array().items(itemInfo)
        
    })
    
    // Joi.array().items( 
    //     {
    //     dishName: Joi.string().required(),
    //     price: Joi.number().required(),
    //     category: Joi.string().required()
    // }
    // )


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(0).max(5)
    }).required()
})



