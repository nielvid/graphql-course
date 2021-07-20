const mongoose = require('mongoose')

const Book = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    published: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors"
    }
})
const book = mongoose.model('book', Book)
module.export  = books