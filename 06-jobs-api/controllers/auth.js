const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const { use } = require('../routes/auth')



const register = async (req, res) => {
    console.log(1)
    const { name, email, password } = req.body
    const user = await User.create({ ...req.body })

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name, email, password')
    }
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        name: user.name, token
    })
}

const login = async (req, res) => {
    console.log(1)


    const { email, password } = req.body

    if (!email || !password) {

        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    //check email
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials email')
    }

    //check password
    const isPassCorrect = await user.comparePassword(password)
    if (!isPassCorrect) {
        throw new UnauthenticatedError('Invalid Credentials password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        name: user.name, token
    })
}

module.exports = {
    register, login
}