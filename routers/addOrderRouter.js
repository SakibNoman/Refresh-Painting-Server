const express = require('express');
const { client } = require('../Connection/DBConnection');

const router = express.Router();


// client.connect(err => {
//     const orderCollection = client.db("refreshdb").collection("orders");

//     router.post("/", (req, res) => {
//         const order = req.body;
//         orderCollection.insertOne(order)
//             .then(result => {
//                 res.send(result.insertedCount > 0)
//             })
//     })
// })



module.exports = router;