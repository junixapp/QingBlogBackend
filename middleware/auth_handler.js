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
const authMethod = ['POST','PUT','DELETE']

//排除的路由
const excludePaths = [
    '/api/auth/login',
    '/api/auth/register',
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


const token_handler = async (ctx, next) => {
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
            }
            console.log(e);
        }

    }
}

module.exports = () => token_handler