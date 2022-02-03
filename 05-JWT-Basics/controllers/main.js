const { Unauthenticated, BadRequest, CustomApiError } = require('../error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new BadRequest(`Please provide username and pass`)
    }

    //try to payload small, better experience for use
    const id = new Date().getDate()
    const privateKeyToken = process.env.JWT_SECRET
    const token = jwt.sign({ id, username }, privateKeyToken, { expiresIn: '30d' })

    // console.log(token)
    return res.status(200).json({ msg: 'user created', token })

}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)


    res.status(200).json({ msg: `Hello  ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${req.user.id}` })
    // console.log(authHeader)

}

module.exports = { login, dashboard }