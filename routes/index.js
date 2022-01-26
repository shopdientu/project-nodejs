const express = require('express')
const router = express.Router()
const { getAllTask, updateTask, getTask, deleteTask, createTask, editTask } = require('../tasks')

router.route('/').get(getAllTask).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).put(editTask).delete(deleteTask)


module.exports = router