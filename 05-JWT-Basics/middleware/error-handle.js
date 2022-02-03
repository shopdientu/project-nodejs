const { CustomApiError } = require('../error')
const { StatusCodes } = require('http-status-codes')


const errorMiddleware = async (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        // console.log('message')
        return res.status(err.statusCode).json({ msg: `${err.message}` })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: `This is handdle error` })
}

module.exports = errorMiddleware