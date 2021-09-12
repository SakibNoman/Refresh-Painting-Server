const express = require('express');
const client = require('../Connection/DBConnection');

const router = express.Router();


client.connect(err => {
    const orderCollection = client.db("refreshdb").collection("orders");

    router.get("/", (req, res) => {
        const email = req.params.email
        orderCollection.find({ email: email })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
})



module.exports = router;