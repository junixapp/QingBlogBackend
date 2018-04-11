'use strict'

const Router = require('koa-router')
const authController = require('../controller/auth_controller')

const router = new Router({
    prefix: '/api/auth'
})

router.post('/login', async (ctx) => {
    let {username, password} = ctx.request.body
    let data = await authController.loginUser(username, password)
    // 将jwt token设置到相应header中
    ctx.response.set('token', data.token)
    ctx.success(data.user)
})

router.post('/register', async (ctx) => {
    let {username, password} = ctx.request.body
    await authController.registerUser(username, password)
    ctx.success()
})



module.exports = router