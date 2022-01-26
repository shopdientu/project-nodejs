class CustomApiError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode) => {
    console.log(msg)
    return new CustomApiError(msg, statusCode)
}

module.exports = { createCustomError, CustomApiError }