'use strict'
/**
 * 全局错误统一处理
 */
const {ApiMsg, DBError, UnknownError} = require('../model/api_msg')
const ValidatorError = require('mongoose').Error.ValidationError


const err_handler = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        // when it is a api-level or db-level error, should be 400.
        if (err && err instanceof ApiMsg) {
            //it is a api-level error.
            ctx.error(err.code, err.msg)
        } else if (err && err instanceof ValidatorError) {
            // it is a mongoose validate error. show it to client.
            //err.message:  blog validation failed: author: 博客作者不能缺少, category: 博客分类不能缺少
            //进行正则处理，取出对应的错误信息
            let reg = /.*validation failed:(.*)/
            let formatMsg = reg.exec(err.message)[1] || reg
            ctx.error(DBError.code, formatMsg)
        } else {
            //it is unknown error
            ctx.error(UnknownError.code, UnknownError.msg)
        }
    }
}

module.exports = () => err_handler