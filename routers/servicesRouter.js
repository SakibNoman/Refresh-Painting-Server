const express = require('express');
const client = require('../Connection/DBConnection');

const router = express.Router();


client.connect(err => {
    const servicesCollection = client.db("refreshdb").collection("services");

    router.get("/", (req, res) => {
        servicesCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
})



module.exports = router;