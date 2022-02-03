const notFoundMiddleware = (req, res) => {
    res.status(404).json(`Not Found Request`)
}

module.exports = notFoundMiddleware