const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {}
})

module.exports = mongoose.model("admin", adminSchema);