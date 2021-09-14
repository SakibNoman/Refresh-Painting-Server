const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullname: {},
    email: {},
    service: {},
    price: {},
    status: {},
    color: {},
    description: {},
    image: {}
})

module.exports = mongoose.model("order", orderSchema);