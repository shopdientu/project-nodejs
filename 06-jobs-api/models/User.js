const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 6,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email;'
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        // maxlength: 12
    }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
})

UserSchema.methods.createJWT = function () {
    return jsonwebtoken.sign({
        userId: this._id,
        name: this.name
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (canditatePassword) {

    const isMatch = await bcryptjs.compare(canditatePassword, this.password)
    return isMatch
}


module.exports = mongoose.model('User', UserSchema)