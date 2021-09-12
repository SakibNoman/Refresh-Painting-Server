const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


//internal imports
const client = require('./Connection/DBConnection');
const servicesRouter = require('./routers/servicesRouter')
const reviewsRouter = require('./routers/reviewsRouter')
const ordersRouter = require('./routers/ordersRouter')
const addOrderRouter = require('./routers/addOrderRouter')
const addServiceRouter = require('./routers/addServiceRouter')
const singleServiceRouter = require('./routers/singleServiceRouter')
const deleteServiceRouter = require('./routers/deleteServiceRouter')
const addReviewRouter = require('./routers/addReviewRouter')
const userOrderRouter = require('./routers/userOrderRouter')
const updateStatusRouter = require('./routers/updateStatusRouter')


const app = express()

//middleWires
app.use(bodyParser.json());
app.use(cors());

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
app.use('/deleteService/:id', deleteServiceRouter)  //api for deleting service by admin
app.use('/addReview', addReviewRouter) //api to post review by user
app.use('/userOrder/:email', userOrderRouter) //api to find order for specific user
app.use('/updateStatus/:id', updateStatusRouter) //api to update order status


client.connect(err => {
    const orderCollection = client.db("refreshdb").collection("orders");
    const adminCollection = client.db("refreshdb").collection("admins");

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

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
})

