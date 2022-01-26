module.exports = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            console.log('catch')
            console.log(error)
            next(error)
        }
    }
}