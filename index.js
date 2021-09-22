const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


//internal imports
const servicesRouter = require('./routers/servicesRouter')
const reviewsRouter = require('./routers/reviewsRouter')
const ordersRouter = require('./routers/ordersRouter')
const addOrderRouter = require('./routers/addOrderRouter')
const addServiceRouter = require('./routers/addServiceRouter')
const deleteServiceRouter = require('./routers/deleteServiceRouter')
const addReviewRouter = require('./routers/addReviewRouter')
const updateStatusRouter = require('./routers/updateStatusRouter')
const adminCheckRouter = require('./routers/adminCheckRouter')
const addAdminRouter = require('./routers/addAdminRouter')
const rootRouter = require('./routers/rootRouter');
const token = require('./routers/token');
const dbConnection = require('./Connection/DBConnection');
const verifyJWT = require('./middlewares/verifyJWT');


const app = express()

//middleWires
app.use(bodyParser.json());
app.use(cors());

//dbConnection
dbConnection();

//routes
app.use('/', rootRouter)
app.use('/services', servicesRouter)
app.use('/reviews', reviewsRouter)
app.use('/orders', verifyJWT, ordersRouter)
app.use('/addOrder', addOrderRouter)
app.use('/addService', addServiceRouter) //api for add new services by admin
app.use('/singleService', servicesRouter) //api for single service when clicked on service card
app.use('/deleteService', deleteServiceRouter)  //api for deleting service by admin
app.use('/addReview', addReviewRouter) //api to post review by user
app.use('/userOrder', ordersRouter) //api to find order for specific user
app.use('/updateStatus', updateStatusRouter) //api to update order status
app.use('/isAdmin', adminCheckRouter)//api to check if logged user is an admin
app.use('/addAdmin', addAdminRouter)//api to add new admin
app.use('/token', token)


app.listen(process.env.PORT || 5000, () => {
    console.log(process.env.PORT);
})

