'use strict'
const mongoose = require('mongoose')

const StatePublish = 0 //已发布状态
const StateDraft = 1 //草稿状态
const StateRecycle = 2 //回收站状态

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"博客标题不能缺少"]
    },
    content: {
        type: String,
        required: [true,"博客内容不能缺少"]
    },
    tags: {
        type: [String]
    },
    readCount: {
        type: Number,
        default: 0
    },
    state: {
        type: Number,
        default: StatePublish,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    author: {
        type: String,
        required: [true, "博客作者不能缺少"]
    }
}, {timestamps: true})

schema.virtual('isPublish').get(function () {
    return this.state === StatePublish
})
schema.virtual('isDraft').get(function () {
    return this.state === StateDraft
})
schema.virtual('isRecycle').get(function () {
    return this.state === StateRecycle
})

module.exports = mongoose.model('blog', schema)

