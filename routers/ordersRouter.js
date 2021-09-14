const express = require('express');
const order = require('../models/order');

const router = express.Router();


router.get("/", (req, res) => {
    order
        .find({})
        .then(orders => res.json(orders))
})

router.get("/:email", (req, res) => {
    const email = req.params.email
    order.find({ email: email })
        .then((documents) => {
            res.send(documents)
        })
})

module.exports = router;