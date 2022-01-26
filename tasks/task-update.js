const asyncWrapper = require('../middleware/async')
const Task = require('../models/Task')
const { createCustomError } = require('../error/custom-error')


module.exports = asyncWrapper(async (req, res) => {
    const id = req.params.id
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        res.status(404).json({ msg: `not found task with id: ${id}` })
    }
    res.status(201).json(task)

})