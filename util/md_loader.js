const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const errHandler = require('../middleware/err_handler')
const authHandler = require('../middleware/auth_handler')
const restHandler = require('../middleware/rest_handler')
const permissionHandler = require('../middleware/permission_handler')


function load_middlerware(app) {
    //logger放在restHandler的外层，因为内部会更改ctx的status，
    app.use(logger())
    //rest_handler，给ctx安装success和error方法
    app.use(restHandler)

    // global error handler
    app.use(errHandler)

    app.use(bodyParser())

    //jwt中间件
    app.use(authHandler)

    //权限检查中间件
    app.use(permissionHandler)

}

module.exports = load_middlerware
