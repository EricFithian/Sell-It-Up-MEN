// import express
const express = require('express');

// create instance
const app = express();

// configure the app settings (used by app.listen)
const PORT = 4000;

/* 
    App Data
*/
const products = ['t-shirt','shoes', 'necklace', 'catfood', 'jump-rope']


/* 
    EXPRESS Middleware
*/


/* 
    EXPRESS Routing: express provides route methods that will intercept requests to the server:
    1. filter by method - app.get will only run if the type of request has a GET method
    2. match the url path argument - a requested url from the client - if a match is found a call back function is called
    3. the callback function - provided two arguments by express representing data/methods concerning the request and the response. 
*/  


// a products route that accesses data from the 'products' array (DB)
app.get('/products/:productId/', (req,res)=>{
    // URL - parameter / variable / placeholder for data      
    let productId = req.params.productId
    // console.log(productId)
    res.send(`testing products route for product: ${products[productId]}`)
})

// a 'greetings route' for users
app.get('/users/:firstName', (req,res)=>{
    // an intermediary variable
    let user = req.params.firstName
    // testing the intermediary variable
    console.log(user, 'firstname test')
    // the response - displays the greeting message
    res.send(`Hello, ${req.params.firstName}.`)
})

// a 'favorite numbers' route
app.get('/numbers/:favorite', (req,res)=>{
    res.send(`My favorite number: ${req.params.favorite}`)
})

// hard coding our paths - static routes do not scale - not great!

// app.get('/products/0', (req,res)=>{
//     res.send(`This is my t-shirt route!!!<br/> ${products[0]}`)
// })

// app.get('/products/1', (req,res)=>{
//     res.send(`This is my shoe route!!!<br/> ${products[1]}`)
// })

// app.get('/products/2', (req,res)=>{
//     res.send(`This is my necklace route!!!<br/> ${products[2]}`)
// })

// 'home' Route - '/' - send back a message - Welcome to Sell-it-UP!

app.get('/', (request, response) => {
    // request {} - a request object provides information about the request made by the client
    // response {} - a response object is a collection of properties / methods. 
    // A response is required for every request. 
    // response.send() - a method that closes the response cycle -> send back info/data to the browser
    response.send('Welcome to Sell-it-UP!')
})


/* 
    EXPRESS Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
*/ 

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))