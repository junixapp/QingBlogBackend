'use strict'
const mongoose = require('mongoose')
//认证信息
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "用户名不能缺少"]
    },
    password: {
        type: String,
        required: [true, "密码不能缺少"]
    },
    role: {      //用户角色
        type: Number,
        default: 0
    }
}, {timestamps: true});

const AdminRole = 10086;

schema.virtual('isAdmin').get(function () {
    return this.role === AdminRole
})

module.exports = mongoose.model('auth', schema)

