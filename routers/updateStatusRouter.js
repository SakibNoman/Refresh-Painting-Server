const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const order = require('../models/order');
const router = express.Router();


router.patch("/:id", (req, res) => {
    const id = ObjectID(req.params.id)
    order
        .findOneAndUpdate({ _id: id }, {
            $set: { status: req.body.status, color: req.body.color }
        })
        .then(result => {
            console.log(result);
        })
})



module.exports = router;