const express = require('express');
const { client } = require('../Connection/DBConnection');

const router = express.Router();


// client.connect(err => {
//     const reviewsCollection = client.db("refreshdb").collection("reviews");

//     router.post("/", (req, res) => {
//         const review = req.body;
//         reviewsCollection.insertOne(review)
//             .then(result => {
//                 res.send(result.insertedCount > 0)
//             })
//     })
// })



module.exports = router;