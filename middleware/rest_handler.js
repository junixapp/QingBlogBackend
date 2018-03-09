'use strict'
const {Success} = require("../model/api_msg");

module.exports = () => {
    return async (ctx, next) => {
        //检查是否是rest请求，如果是则安装rest方法
        let restPath = "/api"
        if(ctx.path.startsWith(restPath)){
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
        }
        await next()
    }
}