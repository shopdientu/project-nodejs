const mongoose = require('mongoose')


const connectDB = (uri) => {
    return mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => { console.log('connected MongoDB ...') })
        .catch((err) => { console.log(err) })
}



module.exports = connectDB

