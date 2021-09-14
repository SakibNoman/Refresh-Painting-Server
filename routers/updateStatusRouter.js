const express = require('express');
const { client } = require('../Connection/DBConnection');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();


// client.connect(err => {
//     const orderCollection = client.db("refreshdb").collection("orders");

//     router.patch("/", (req, res) => {
//         const id = ObjectID(req.params.id)
//         orderCollection.updateOne({ _id: id }, {
//             $set: { status: req.body.status, color: req.body.color }
//         })
//             .then(result => {
//                 console.log(result);
//             })
//     })
// })



module.exports = router;