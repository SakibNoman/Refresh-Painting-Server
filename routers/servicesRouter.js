const express = require('express');
const service = require('../models/service');

const router = express.Router();


router.get("/", (req, res) => {
    service
        .find()
        .then(services => res.json(services))
})

module.exports = router;