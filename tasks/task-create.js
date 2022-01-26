const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../error/custom-error')

module.exports = asyncWrapper(async (req, res) => {
    const name = req.body.name
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})