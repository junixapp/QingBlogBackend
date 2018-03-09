'use strict'

const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        required: [true,"用户名不能缺少"]
    },
    nickname: String,
    avatar: String,
    phone: String,
    email: String,
    website: String,
    intro: String,

}, {timestamps: true})

module.exports = mongoose.model('user', schema)