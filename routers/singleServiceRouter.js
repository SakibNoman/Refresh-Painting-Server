const express = require('express');
const client = require('../Connection/DBConnection');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();


client.connect(err => {
    const servicesCollection = client.db("refreshdb").collection("services");

    router.get("/", (req, res) => {
        const id = ObjectID(req.params.id)
        servicesCollection.find({ _id: id })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
})



module.exports = router;