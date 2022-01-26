const connectDB = require('./db/connect')
const express = require('express')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorMiddle = require('./middleware/error')

const app = express()
const tasks = require('./routes')
const port = process.env.PORT || 5000


//middleware
app.use(express.static('./public'))

//routes

// api task
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorMiddle)

const start = async () => {
    try {
        // console.log()
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log('Start server with ' + port) })
    } catch (error) {
        console.log(error)
    }
}

start()

