const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handle')
const port = process.env.PORT || 5000
const mainRouter = require('./routes/main')



//public
app.use(express.static('./public'))

//api json
app.use(express.json())

//router
app.use('/api/v1', mainRouter)


//middleware
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`connect server with port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()