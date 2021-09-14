const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {},
    post: {},
    photo: {},
    review: {},
    rating: {}
})

module.exports = mongoose.model("review", reviewSchema);