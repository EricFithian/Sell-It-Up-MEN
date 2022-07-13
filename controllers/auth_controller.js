const express = require('express')
const bcrypt = require('bcryptjs')
require('dotenv').config();
// import express to access Router function
const router = express.Router()
// creates an instance of the router 
const { User } = require('../models')
/* 
    App Data:
    The products routes below accesses data from the 'products' array (DB) by its index value - we will use 'productId' as the param key.
*/

// express.Router breakdown 
// incoming request to: http://localhost:4000/products
// in server.js we have the following code - app.use('/products', products_controller)

// the products controller's express.Router will then take on processing the request: 

// app.use passes the request {} to the products_controller.js module
// the request evaluates the available routes in the module
// if a matching URL path is found, that route's callback is executed
// otherwise, the remaining routes in server.js (after the middleware) will execute


/*  Beginning of Products routes */

// get all products route
router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
});

router.post("/login", async function (req, res) {
    try {
        // check if the user exists
        const foundUser = await User.findOne({ email: req.body.email });
        console.log(foundUser);
        // if not
        // redirect to register
        if (!foundUser) return res.send("The password or the username is invalid");
        
        // if the user exists
        // validate the user if passwords match -> login
        // .compare(body password, hashed password) => return true or false
        const match = await bcrypt.compare(req.body.password, foundUser.password);
    
        // if not match send error
        if (!match) return res.send("The password or the username is invalid");
    
        // if match create the session and redirect to home\
        // here we have created the key card
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
        };

        console.log(req.session);
    
        return res.redirect("/products");
    } catch (err) {
        console.log(err);
        req.err = err;
        res.send(err);
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register.ejs')
});

router.post('/register', async (req, res, next) => {
    try {
        const foundUser = await User.exists({email: req.body.email})
        if (foundUser) {
            console.log(`You already have an account`)
            return res.redirect('/login')
        }
        const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
        console.log(salt);
        const hash = await bcrypt.hash(req.body.password, salt);
        console.log(hash);
        req.body.password = hash;

        const newUser = await User.create(req.body);

        return res.redirect('/login')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.get("/logout", async (req, res) => {
    try {
        await req.session.destroy();
        console.log(req.session);
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

module.exports = router