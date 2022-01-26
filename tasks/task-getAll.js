const asyncWrapper = require('../middleware/async')
const Task = require('../models/Task')

// console.log(asyncWrapper)

module.exports = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })

})