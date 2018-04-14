const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static');
const mount = require('koa-mount');
const errHandler = require('../middleware/err_handler')
const authHandler = require('../middleware/auth_handler')
const restHandler = require('../middleware/rest_handler')
const permissionHandler = require('../middleware/permission_handler')
const path = require('path')

function load_middlerware(app) {
    //logger放在restHandler的外层，因为内部会更改ctx的status，
    app.use(logger())
    //rest_handler，给ctx安装success和error方法
    app.use(restHandler)

    // global error handler
    app.use(errHandler)

    // static serve
    // app.use(serve(path.join(__dirname, '../static/fed')))
    app.use(mount('/', serve(path.join(__dirname, '../static/fed'))));
    app.use(mount('/fed', serve(path.join(__dirname, '../static/fed'))));
    app.use(mount('/admin', serve(path.join(__dirname, '../static/admin'))));

    app.use(bodyParser())

    //jwt中间件
    app.use(authHandler)

    //权限检查中间件
    app.use(permissionHandler)

}

module.exports = load_middlerware
