const mongoose = require('mongoose')

var dishSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    }

}, {timestamps : true})

module.exports = mongoose.model('Dish', dishSchema)