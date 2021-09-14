const express = require('express');
const review = require('../models/review');

const router = express.Router();

router.get("/", (req, res) => {
    review
        .find()
        .then(reviews => res.json(reviews))
})


module.exports = router;