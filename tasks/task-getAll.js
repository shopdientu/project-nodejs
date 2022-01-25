const Task = require('../models/Task')

module.exports = async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(201).json(task)
    } catch (error) {

    }
}