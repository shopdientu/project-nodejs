const Task = require('../models/Task')

module.exports = {
    getTask: require('./task-get-id'),
    getAllTask: require('./task-getAll'),
    createTask: require('./task-create'),
    updateTask: require('./task-update'),
    editTask: require('./task-edit'),
    deleteTask: require('./task-delete')
}