const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0,
        min: 0, 
        max: 5,
        // required: true 
    },
    content: {
        type: String,
        required: [true, 'You must provide a reason for your review']
    },
    product: {
        // required: [true, "a product is required for review"],
        type: mongoose.Types.ObjectId,
        // type - configures 'product' field to only store MDB - Object Ids
        // when creating a new review - we absolutely need an object 
        ref: 'Product'
        // reference is how mongoose will know where to look up documents
        // that match the current product's ObjectId
        // ref should store a string that matches the name of your related model
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

// Schema - blueprint - handles validation, interface with the DB 
// handle creating a 'reviews' collection
// meta information - timestamps / updates / data formatting

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review