const express = require('express');
const client = require('../Connection/DBConnection');

const router = express.Router();


client.connect(err => {
    const reviewsCollection = client.db("refreshdb").collection("reviews");

    router.get("/", (req, res) => {
        reviewsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
})



module.exports = router;