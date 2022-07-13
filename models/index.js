// This is requiring in the connection that's linking to my Mongo Atlas
// require('../config/db.connection')

module.exports = {
    Product: require('./Product'),
    Review: require('./Review'),
    User: require('./User'),
}