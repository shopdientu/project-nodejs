const Task = require('../models/Task')

module.exports = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.find({
            _id: id
        })
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json(error)
    }
}