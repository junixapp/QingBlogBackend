'use strict'
const {Success} = require("../model/api_msg");

module.exports = () => {
    return async (ctx, next) => {
        //成功响应的方法
        ctx.type = 'application/json';
        ctx.success = (data) => {
            ctx.status = 200;
            ctx.body = {
                code: Success.code,
                msg: Success.msg,
                data: data
            }
        };
        //失败响应的方法
        ctx.error = (code, msg) => {
            ctx.status = 400;
            ctx.body = {
                code: code,
                msg: msg,
            }
        };

        await next()
    }
}