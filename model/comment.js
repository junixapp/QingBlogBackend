'use strict'
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    content: {
        type: String,
        required:[true,"评论内容不能缺少"]
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:[false,"评论作者不能缺少"]
    },
    nickname: String,
    blogId: {
        type: String,
        required:[true,"评论的博客不能缺少"]
    },
    parentCommentId: {
        type: String,
    }
}, {timestamps: true});

module.exports = mongoose.model('comment', schema);

