// import express
const express = require('express');
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const navLinks = require('./navLinks')

// const productController = require('./controllers/products_controller')
const controllers = require('./controllers')
// create instance
const app = express();


// db connection
require('./config/db.connection')

// configure the app settings (used by app.listen)
const PORT = 4000;

// app configs - app.set()
app.set('view engine', 'ejs')

/* 
    EXPRESS Middleware - a later topic - this code will run for every route
*/

// first middleware - middleware executes for every request - 
// express.static helps express find where certain files are located

app.use(express.static('public'))

// method override middleware
// convert a get/post request to a delete (or put) request
app.use(methodOverride('_method'))

// body-parser middleware -> intercept the data from our post request
// take all of the data in the url-string content and create an object - req.params 
// request body -> data - parsed by the middleware

app.use(express.urlencoded({ extended: false }))

app.use(
    session({
        // where to store the sessions in mongodb
        store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/sellitup" }),
        // secret key is used to sign every cookie to say its is valid
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        // configure the experation of the cookie
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        },
    })
);

app.use(navLinks)
app.use(function (req, res, next) {
    res.locals.user = req.session.currentUser;
    console.log(res.locals);
    console.log(`Current user is ${res.locals.user}`)
    next();
});


// CONTROLLERS 

app.use('/products', controllers.products) // "products" router
app.use('/reviews', controllers.reviews) // reviews controller
app.use('/', controllers.auth) // auth controller
// additional controllers can be added here. These controllers will handle requests for other resources (transactions, users, auth, landing pages, etc)

/* 
    EXPRESS Routing: express provides route methods that will intercept requests to the server:
    1. filter by method - app.get will only run if the type of request has a GET method
    2. match the url path argument - a requested url from the client - if a match is found a call back function is called
    3. the callback function - provided two arguments by express representing data/methods concerning the request and the response. 
        3a - request {} - a request object provides information about the request made by the client
        3b - response {} - a response object is a collection of properties / methods. 
        3c - response.send() - a response method that closes response cycle -> send back info/data to the browser
    
    Note: A response method call is required for every request otherwise the server will "hang" and timeout after 30-60 seconds
*/


// Products "Home" route 

app.get('/', (request, response) => response.send('Welcome to Sell-it-UP!'))

/* 
    EXPRESS Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
*/

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))