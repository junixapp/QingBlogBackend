'use strict'
/**
 * token验证
 */

const authController = require('../controller/auth_controller')
const { TokenMissError, TokenInvalidError,TokenWrongError} = require("../model/api_msg")
const jwt = require('jsonwebtoken')
const config = require('../config')
const util = require('util')

//需要验证的方法
const authMethod = ['POST','PUT','DELETE'];

//排除的路由
const excludePaths = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/blogs/addReadCount',
    '/api/stats',
    '/api/comments'
]

//检查是否需要排除
function isExclude(method, path) {
    if(!authMethod.includes(method.toUpperCase())){
        return true
    }

    if(excludePaths.includes(path)){
        return true
    }
    excludePaths.forEach((p) => {
        if(path.startsWith(p)){
            return true
        }
    })
    return false
}


module.exports = async (ctx, next) => {
    if(isExclude(ctx.method, ctx.path)){
        await next()
    }else {
        if(!ctx.header.token){
            throw TokenMissError;
        }

        try {
            // 验证jwt token
            const data = await util.promisify(jwt.verify)(ctx.header.token, config.JWT_SECRET);

            //放入全局auth信息
            let auth = await authController.getAuthByUsername(data.username);
            //put auth info to ctx.state.
            ctx.state.auth = auth;
            
            await next()
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                // token过期
                throw TokenInvalidError
            } else if (e.name === 'JsonWebTokenError') {
                // secret 错误
                throw TokenWrongError
            } else {
                // 这个异常一定要抛出，因为上面将await next()写在了try里面，那么后续的中间件抛出的异常就会被此处捕获到
                // 然后继续抛出，交由全局错误器处理
                throw e
            }
        }

    }
}
