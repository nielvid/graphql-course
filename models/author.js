const mongoose = require('mongoose')

const Authors = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    age: Number,
    // books: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "books"
    // }
})
const Author = mongoose.model("Author", Authors)
module.exports  = Author