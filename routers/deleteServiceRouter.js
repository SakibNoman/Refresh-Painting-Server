const express = require('express');
const client = require('../Connection/DBConnection');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();


client.connect(err => {
    const servicesCollection = client.db("refreshdb").collection("services");

    router.delete("/", (req, res) => {
        const id = ObjectID(req.params.id)
        servicesCollection.findOneAndDelete({ _id: id })
            .then(res => res.json())
            .then(data => console.log("successfully deleted"))
    })
})



module.exports = router;