'use strict'

const Router = require('koa-router')
const categoryController = require('../controller/category_controller')

const router = new Router({
    prefix: '/api/categories'
})

router.get("/", async (ctx) => {
    if(ctx.request.query.isGetAll){
        ctx.success(await categoryController.getAllCategory())
    }else {
        ctx.success(await categoryController.getCategoriesByPage(ctx.request.query.page))
    }

})

router.post("/", async (ctx) => {
    let c = await categoryController.addCategory(ctx.request.body.name)
    ctx.success(c)
})

router.put("/", async (ctx) => {
    await categoryController.updateCategory(ctx.request.query.id, ctx.request.body) //body是更新的内容，有可能是name和blogCOunt
    ctx.success()
})

router.delete("/", async (ctx) => {
    await categoryController.deleteCategory(ctx.request.query.id)
    ctx.success()
})

module.exports = router