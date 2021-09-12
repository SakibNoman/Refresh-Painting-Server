const express = require('express');
const client = require('../Connection/DBConnection');

const router = express.Router();


client.connect(err => {
    const servicesCollection = client.db("refreshdb").collection("services");

    router.post("/", (req, res) => {
        const service = req.body;
        servicesCollection.insertOne(service)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
})



module.exports = router;