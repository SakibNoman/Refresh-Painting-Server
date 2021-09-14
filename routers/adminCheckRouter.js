const express = require('express');
const { client } = require('../Connection/DBConnection');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();


// client.connect(err => {
//     const adminCollection = client.db("refreshdb").collection("admins");

//     router.post("/", (req, res) => {
//         const email = req.body.email
//         adminCollection.find({ email: email })
//             .toArray((err, admin) => {
//                 res.send(admin.length > 0)
//             })
//     })
// })



module.exports = router;