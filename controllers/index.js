// This is connecting the models, which connects to the db, into the controllers
// require('../models')

module.exports = {
    products: require('./products_controller'),
    reviews: require('./reviews_controller'),
    auth: require('./auth_controller')
}