'use strict'

const Router = require('koa-router')
const userController = require('../controller/user_controller')
const authController = require('../controller/auth_controller')

const router = new Router({
    prefix: '/users'
})

router.get('/:username', async (ctx) => {
    let data = await userController.getUserByUsername(ctx.params.username)
    ctx.success(data)
})

router.delete('/:username', async (ctx) => {

    await userController.deleteUserByUsername(ctx.params.username)
    await authController.deleteAuthByUsername(ctx.params.username)
    ctx.success()
})



module.exports = router