'use strict'

const Router = require('koa-router')
const categoryController = require('../controller/category_controller')

const router = new Router({
    prefix: '/api/categorys'
})

router.get("/", async (ctx) => {
    let data = await categoryController.getAllCategory()
    ctx.success(data)
})

router.post("/", async (ctx) => {
    await categoryController.addCategory(ctx.request.body.name)
    ctx.success()
})

router.put("/", async (ctx) => {
    await categoryController.updateCategory(ctx.request.query.id, ctx.request.body.name)
    ctx.success()
})

router.delete("/", async (ctx) => {
    await categoryController.deleteCategory(ctx.request.query.id)
    ctx.success()
})

module.exports = router