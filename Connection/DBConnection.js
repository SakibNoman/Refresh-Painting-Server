const mongoose = require('mongoose')


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cqpfg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


function dbConnection() {
    //db connection
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("DB Connected"))
        .catch(err => console.log(err))
}
module.exports = dbConnection;