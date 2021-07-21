const mongoose = require('mongoose')

const Books = new mongoose.Schema({
    title:String,
     published: String,
    // authorId: {
    //     type:String,
    //     required: true
    // },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors"
    }
})
const Book = mongoose.model('Book', Books)
module.exports  = Book