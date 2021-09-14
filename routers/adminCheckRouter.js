const express = require('express');
const admin = require('../models/admin');

const router = express.Router();

router.post("/", (req, res) => {
    const email = req.body.email
    admin
        .find({ email: email })
        .then((documents) => {
            if (documents.length > 0) {
                res.send(true)
            }
            else {
                res.send(false)
            }
        })
})



module.exports = router;