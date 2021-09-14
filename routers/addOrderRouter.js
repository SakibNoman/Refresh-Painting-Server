const express = require('express');
const Order = require('../models/order');

const router = express.Router();


router.post("/", (req, res) => {
    const order = new Order(req.body);
    order
        .save()
        .then((info) => {
            return res.json(Boolean(info._id))
        }).catch(err => {
            return res.status(500).json({
                error: "NOT able to take order in DB" + err
            })
        })
})



module.exports = router;