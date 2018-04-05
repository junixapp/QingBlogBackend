'use strict'

const Router = require('koa-router')
const blogController = require('../controller/blog_controller')

const router = new Router({
    prefix: '/blogs'
})

router.get("/", async (ctx) => {
    let page = ctx.request.query.page || 0
    let data = await blogController.getBlogs(page)
    ctx.success(data)
})

router.post("/", async (ctx) => {
    let blog = ctx.request.body
    blog.author = ctx.state.auth.username
    await blogController.addBlog(blog)
    ctx.success()
})

router.put("/", async (ctx) => {
    let id = ctx.request.query.id
    await blogController.updateBlog(id, ctx.request.body)
    ctx.success()
})


router.delete("/", async (ctx) => {
    let id = ctx.request.query.id
    await blogController.deleteBlog(id)
    ctx.success()
})


module.exports = router