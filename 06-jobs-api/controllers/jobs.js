// const JobModel = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const Job = require('../models/Job')



const getAllJobs = async (req, res) => {
    const jobs = await Job.find()
    // console.log(1)
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw new NotFoundError(`NotFound job id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    // const { id } = req.params
    req.body.createBy = req.user.userId
    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({ job })
    // res.send('create job user')
}

const updateJob = async (req, res) => {

    const { body, user, params } = req
    console.log(body)

    if (body.company === '' || body.position === '') {
        throw new BadRequestError('Company or Position can not empty!!!')
    }

    const job = await Job.findByIdAndUpdate({ _id: params.id, createBy: user.userId }, body, { new: true, runValidators: true })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })

}

const editJob = async (req, res) => {
    const { id } = req.params
    res.status(222).json(id)

}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id },
        body
    } = req

    const job = await Job.findByIdAndRemove({
        _id: id,
        createBy: userId
    })

    if (!job) {
        throw new NotFoundError(`No job id ${id}`)
    }

    res.status(StatusCodes.OK).send('delete succes')

}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    editJob,
    deleteJob

}