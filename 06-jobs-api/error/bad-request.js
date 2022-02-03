const CustomApiError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class BadRequest extends CustomApiError {
    constructor(mess) {
        super(mess)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest