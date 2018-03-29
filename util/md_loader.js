const logger = require('koa-logger')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const errHandler = require('../middleware/err_handler')
const authHandler = require('../middleware/auth_handler')
const restHandler = require('../middleware/rest_handler')
const mount = require('koa-mount');

function load_middlerware(app) {
    //logger放在restHandler的外层，因为内部会更改ctx的status，
    app.use(logger())

    //rest_handler，给ctx安装success和error方法
    app.use(restHandler())

    // global error handler
    app.use(errHandler())

    let opts = {
        maxage: 1000 * 60 * 60 * 24 * 365
    }
    //将static中间件挂载到指定路径，默认是根目录
    // app.use(mount('/static', serve("static", opts)))
    app.use(mount('/', serve("static", opts)))
    app.use(bodyParser())

    //token process
    app.use(authHandler())

}

module.exports = load_middlerware
