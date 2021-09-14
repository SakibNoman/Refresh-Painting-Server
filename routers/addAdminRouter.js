const express = require('express');
const { client, dbClientConnect } = require('../Connection/DBConnection');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();


// client.connect(err => {
//     const adminCollection = client.db("refreshdb").collection("admins");

//     router.post("/", (req, res) => {
//         const email = req.body;
//         adminCollection.insertOne(email)
//             .then(result => {
//                 res.send(result.insertedCount > 0)
//             })
//     })
// })
// dbClientConnect(err => {
//     const adminCollection = client.db("refreshdb").collection("admins");

//     router.post("/", (req, res) => {
//         const email = req.body;
//         adminCollection.insertOne(email)
//             .then(result => {
//                 res.send(result.insertedCount > 0)
//             })
//     })
// })



module.exports = router;