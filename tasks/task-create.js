const Task = require('../models/Task')

module.exports = async (req, res) => {
    try {
        const name = req.body.name
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json(error)
    }
}