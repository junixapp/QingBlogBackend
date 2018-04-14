'use strict'

const Router = require('koa-router')
const statController = require('../controller/stat_controller')

const router = new Router({
    prefix: '/api/stats'
})

router.get("/count", async (ctx) => {
    let data = await statController.getAccessCount()
    ctx.success(data)
})

router.post("/", async (ctx) => {
    await statController.addStat(ctx.request.body)
    ctx.success()
})



module.exports = router