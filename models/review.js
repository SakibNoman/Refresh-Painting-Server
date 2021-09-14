const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {},
    post: {},
    photo: {},
    review: {},
    rating: {}
}, { timestamps: true })

module.exports = mongoose.model("review", reviewSchema);