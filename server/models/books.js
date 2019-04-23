const mongoose = require('mongoose');

const { Schema } = mongoose;
const booksModel = new Schema({
    author: { type: String, required: true },
    country: { type: String, required: true },
    imageLink: { type: String, required: true },
    language: { type: String, required: true },
    link: { type: String, required: true },
    pages: { type: Number, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true }
})

module.exports = mongoose.model('Book', booksModel);
