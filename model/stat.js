'use strict'
//网站统计数据
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    visit_ip: {   //访问ip
        type: String,
        required: [true,"IP不能缺少"]
    },
    visit_area: {   //访问的地区
        type: String
    },
    user_agent: {   //访问客户端
        type: String,
        required: [true,"UserAgent不能缺少"]
    },
    visit_url: {
        type: String, //访问路径
        required: [true,"visit_url不能缺少"]
    },
    visit_time: {
        type: Date,  //访问时间
        required: [true,"visit_time不能缺少"]
    }
}, {timestamps: true})

module.exports = mongoose.model('stat', schema)