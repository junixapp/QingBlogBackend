'use strict'
const {PermissionDenyError} = require('../model/api_msg')
// 权限检查中间件
//是否需要检查权限
function isNeedPermission(ctx) {
    return ctx.path.startsWith("/users") && ctx.method==="DELETE"
}
module.exports =  async (ctx, next) => {
    //checkPermission
    if(isNeedPermission(ctx)){
        if(!ctx.state.auth.isAdmin){
            throw PermissionDenyError
        }
    }
    await next()
}