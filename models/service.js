const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    serviceName: {},
    servicePrice: {},
    serviceImg: {},
    serviceDesc: {}
})

module.exports = mongoose.model("service", serviceSchema);