const express = require('express')
// import express to access Router function

const router = express.Router()
// creates an instance of the router 

// MODELS
const db = require('../models')

// ROUTES - http://localhost:4000/reviews

// index route - serve a index.ejs template
router.get('/', async (req,res, next)=>{
    // res.send('hitting review index')
    try {
        const allReviews = await db.Review.find({})
        res.send(allReviews)

    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})
// new - serving a new.ejs template
// locahost:4000/reviews/new
router.get('/new', async (req,res, next)=>{

    try {
        const allProducts = await db.Product.find({})
        // console.log(allProducts)
        const context ={products: allProducts}
        res.render('reviews/new.ejs', context)

    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

// create - POST route 
router.post('/', async (req,res, next)=>{
    try{
        const newReviewData = req.body
        const newReview = await db.Review.create(newReviewData)
        console.log(newReview)
        // res.redirect('/reviews')
        res.redirect(`/products/${newReview.product}`)
        // return user to product detail page -> 
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})
// show - serve a show.ejs template
router.get('/:reviewId', async (req,res, next)=>{
    // res.send('hitting review show: '+req.params.reviewId)
    try {
        const foundReview = await db.Review.findById(req.params.reviewId).populate('product')
        res.render('reviews/show.ejs', {review: foundReview})
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})
// update - PUT route
router.put('/:reviewId', async (req,res, next)=>{
    res.send('hitting review update: '+req.params.reviewId)
})
// edit - GET - serve an edit.ejs
router.get('/:reviewId/edit', async (req,res, next)=>{
    res.send('hitting review edit: '+req.params.reviewId)
})
// destroy - delete 
router.delete('/:reviewId', async (req,res, next)=>{
    // res.send('hitting review delete: '+req.params.reviewId)
    try{
       const deleteReview = await db.Review.findByIdAndDelete(req.params.reviewId)
       console.log(deleteReview.id, "<<review |",deleteReview.product,"<<product") 
       res.redirect('/products/'+deleteReview.product)
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router