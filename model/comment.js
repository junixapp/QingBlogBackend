'use strict'
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    content: {
        type: String,
        required:[true,"评论内容不能缺少"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:[true,"评论作者不能缺少"]
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required:[true,"评论的博客不能缺少"]
    }
}, {timestamps: true})

module.exports = mongoose.model('comment', schema)

