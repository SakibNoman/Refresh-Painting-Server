const express = require('express');
const Admin = require('../models/admin');

const router = express.Router();


router.post("/", (req, res) => {
    const admin = new Admin(req.body)
    admin
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