const express = require('express');
const service = require('../models/service');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();


router.get("/", (req, res) => {
    service
        .find()
        .then(services => res.json(services))
})

router.get("/:id", (req, res) => {
    const id = ObjectID(req.params.id)
    service
        .find({ _id: id })
        .then(services => res.json(services))
})

module.exports = router;