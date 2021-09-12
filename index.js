const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const ObjectID = require('mongodb').ObjectID;

//internal imports
const client = require('./Connection/DBConnection');
const servicesRouter = require('./routers/servicesRouter')
const reviewsRouter = require('./routers/reviewsRouter')
const ordersRouter = require('./routers/ordersRouter')
const addOrderRouter = require('./routers/addOrderRouter')
const addServiceRouter = require('./routers/addServiceRouter')
const singleServiceRouter = require('./routers/singleServiceRouter')


const app = express()

//middleWires
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

//routes
app.use('/services', servicesRouter)
app.use('/reviews', reviewsRouter)
app.use('/orders', ordersRouter)
app.use('/addOrder', addOrderRouter)
app.use('/addService', addServiceRouter) //api for add new services by admin
app.use('/singleService/:id', singleServiceRouter) //api for single service when clicked on service card


client.connect(err => {
    const servicesCollection = client.db("refreshdb").collection("services");
    const reviewsCollection = client.db("refreshdb").collection("reviews");
    const orderCollection = client.db("refreshdb").collection("orders");
    const adminCollection = client.db("refreshdb").collection("admins");

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

