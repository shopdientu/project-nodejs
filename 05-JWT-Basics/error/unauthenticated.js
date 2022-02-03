const CustomApiError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class Unauthenticated extends CustomApiError {
    constructor(mess) {
        super(mess)
        this.statusCode = StatusCodes.UNAUTHORIZED

    }
}

module.exports = Unauthenticated