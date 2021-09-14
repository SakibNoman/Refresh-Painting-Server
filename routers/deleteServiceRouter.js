const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const service = require('../models/service');

const router = express.Router();


router.delete("/", (req, res) => {
    const id = ObjectID(req.params.id)
    service
        .deleteOne({ _id: id })
        .then((info) => {
            return res.json(info)
        })
})


module.exports = router;