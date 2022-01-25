const connectDB = require('./db/connect')
const express = require('express')
require('dotenv').config()

const app = express()
const tasks = require('./routes')
const port = 5000


//middleware

//routes
app.get('/hello', (req, res) => {
    res.send('Đây là trang home')
})

// api task
app.use(express.json())
app.use('/api/v1/tasks', tasks)



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

