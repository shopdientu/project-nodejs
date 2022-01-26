const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../error/custom-error')


module.exports = asyncWrapper(async (req, res) => {
    const id = req.params.id
    const task = await Task.findOneAndDelete({
        _id: id
    })
    if (!task) {
        return next(createCustomError(`Not Found with task id: ${id}`, 404))
    }
    res.status(201).json(task)

})