const express = require('express')
const app = express()
const tasks = require('./routes/task')
const port = 5000

app.get('/hello', (req, res) => {
    res.send('Đây là trang home')
})

app.use('/api/v1/tasks', tasks)

app.listen(port, () => {
    console.log('Start server with ' + port)
})
