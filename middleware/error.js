module.exports = (err, req, res, next) => {
    console.log(err.statusCode)
    console.log(err.message)
    return res.status(err.statusCode).json({ msg: err.message, statusCode: err.statusCode })
}