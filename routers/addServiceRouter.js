const express = require('express');
const Service = require('../models/service');
const router = express.Router();


router.post("/", (req, res) => {
    const service = new Service(req.body);

    service
        .save()
        .then((info) => {
            return res.json(Boolean(info._id))
        }).catch(err => {
            return res.status(500).json({
                error: "NOT able to save service in DB" + err
            })
        })
})



module.exports = router;