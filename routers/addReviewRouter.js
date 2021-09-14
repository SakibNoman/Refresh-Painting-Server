const express = require('express');

const router = express.Router();
const Review = require('../models/review');

router.post("/", (req, res) => {
    const review = new Review(req.body)

    review
        .save()
        .then((info) => {
            return res.json(Boolean(info._id))
        }).catch(err => {
            return res.status(500).json({
                error: "NOT able to save user in DB" + err
            })
        })
})



module.exports = router;