const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const ObjectID = require('mongodb').ObjectID;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cqpfg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const servicesCollection = client.db("refreshdb").collection("services");
    const reviewsCollection = client.db("refreshdb").collection("reviews");
    const orderCollection = client.db("refreshdb").collection("orders");

    app.post('/addService', (req, res) => {
        const service = req.body;
        servicesCollection.insertOne(service)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/services', (req, res) => {
        servicesCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.get('/singleService/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        servicesCollection.find({ _id: id })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.delete('/deleteService/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        servicesCollection.findOneAndDelete({ _id: id })
            .then(res => res.json())
            .then(data => console.log("successfully deleted"))
    })

    app.post('/addReview', (req, res) => {
        const review = req.body;
        reviewsCollection.insertOne(review)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/reviews', (req, res) => {
        reviewsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.post('/addOrder', (req, res) => {
        const order = req.body;
        orderCollection.insertOne(order)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/orders', (req, res) => {
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

});

app.listen(process.env.PORT || port)