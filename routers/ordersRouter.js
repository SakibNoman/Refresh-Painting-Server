const express = require('express');
const client = require('../Connection/DBConnection');

const router = express.Router();


client.connect(err => {
    const orderCollection = client.db("refreshdb").collection("orders");

    router.get("/", (req, res) => {
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
})



module.exports = router;