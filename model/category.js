'use strict'
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "分类名称不能缺少"]
    },
    blogCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('category', schema)

