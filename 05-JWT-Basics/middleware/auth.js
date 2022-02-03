const { Unauthenticated, BadRequest } = require('../error')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new BadRequest('NotFound token ')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decodeToken
        req.user = { id, username }
        next()
    } catch (error) { throw new Unauthenticated('not authorized to access this route') }

}