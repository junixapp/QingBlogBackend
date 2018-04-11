'use strict'

const Router = require('koa-router')
const statController = require('../controller/stat_controller')

const router = new Router({
    prefix: '/api/stats'
})

router.get("/", async (ctx) => {
    let data = await statController.getAllStats()
    ctx.success(data)
})

router.post("/", async (ctx) => {
    await statController.addCategory(ctx.request.body)
    ctx.success()
})



module.exports = router