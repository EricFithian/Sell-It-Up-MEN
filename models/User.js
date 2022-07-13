// models/Product.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty :('],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email cannot be empty!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty!']
    },
    avatar: {
        type: String,
        default:
                "https://welovedoodles.com/wp-content/uploads/2021/01/Havanese-puppies-in-New-York-300x243.jpg",
    },
    dateOfBirth: {
        type: String,
        default:'4/26/2022'
    },
    ssn: {
        type: String,
        default: '867-5309'
    }
},
    {
        timestamps: true
    }
);

// mongoose.model(<mongodb collection name>, our schema)
const User = mongoose.model('User', userSchema);

module.exports = User;