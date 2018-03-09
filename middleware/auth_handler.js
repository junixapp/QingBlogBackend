'use strict'
/**
 * token验证和权限检查
 */

const authController = require('../controller/auth_controller')
const {PermissionDenyError} = require("../model/api_msg")

//需要验证的方法
const authMethod = ['POST','PUT','DELETE']

//排除的路由
const excludePaths = [
    '/api/auth/login',
    '/api/auth/register',
]

//检查是否需要排除
function isExclude(path) {
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

//是否需要检查权限
function isNeedPermission(ctx) {
    return ctx.path.startsWith("/users") && ctx.method==="DELETE"
}

const token_handler = async (ctx, next) => {
    if(isExclude(ctx.path)){
        await next()
    }else {
        //放入全局auth信息
        if(authMethod.includes(ctx.method)){
            //need check token
            let auth = await authController.checkToken(ctx.request.header.token)
            //put auth info to ctx.state.
            ctx.state.auth = auth
        }

        //checkPermission
        if(isNeedPermission(ctx)){
            if(!ctx.state.auth.isAdmin){
                throw PermissionDenyError
            }
        }

        await next()
    }
}

module.exports = () => token_handler