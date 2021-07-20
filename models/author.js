const mongoose = require('mongoose')

const Author = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    age: Number,
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    }
})
const author = mongoose.model('author', Author)
module.export  = author