const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const ObjectID = require('mongodb').ObjectID;

//database connection url
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
    const adminCollection = client.db("refreshdb").collection("admins");

    //api for add new services by admin
    app.post('/addService', (req, res) => {
        const service = req.body;
        servicesCollection.insertOne(service)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    //api for getting all services to show in homepage
    app.get('/services', (req, res) => {
        servicesCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //api for single service when clicked on service card
    app.get('/singleService/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        servicesCollection.find({ _id: id })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //api for deleting service by admin
    app.delete('/deleteService/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        servicesCollection.findOneAndDelete({ _id: id })
            .then(res => res.json())
            .then(data => console.log("successfully deleted"))
    })

    //api to post review by user
    app.post('/addReview', (req, res) => {
        const review = req.body;
        reviewsCollection.insertOne(review)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    //api to find all reviews to show in home page
    app.get('/reviews', (req, res) => {
        reviewsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //api to add new order
    app.post('/addOrder', (req, res) => {
        const order = req.body;
        orderCollection.insertOne(order)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    //api to find all orders
    app.get('/orders', (req, res) => {
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //api to find order for specific user
    app.get('/userOrder/:email', (req, res) => {
        const email = req.params.email
        orderCollection.find({ email: email })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //api to update order status
    app.patch('/updateStatus/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        orderCollection.updateOne({ _id: id }, {
            $set: { status: req.body.status, color: req.body.color }
        })
            .then(result => {
                console.log(result);
            })
    })

    //api to add new admin
    app.post('/addAdmin', (req, res) => {
        const email = req.body;
        adminCollection.insertOne(email)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    //api to check if logged user is an admin
    app.post('/isAdmin', (req, res) => {
        const email = req.body.email
        adminCollection.find({ email: email })
            .toArray((err, admin) => {
                res.send(admin.length > 0)
            })
    })

});

app.listen(process.env.PORT || port)