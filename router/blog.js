'use strict'

const Router = require('koa-router')
const blogController = require('../controller/blog_controller')

const router = new Router({
    prefix: '/api/blogs'
})

router.get("/", async (ctx) => {
    let page = ctx.request.query.page || 0
    let cateName = ctx.request.query.categoryName
    let data = []
    if(cateName){
        // 按照分类的名称来获取博客
        data = await blogController.getBlogsByCategoryName(page, cateName)
    }else {
        // 按照分类的id来获取博客
        data = await blogController.getBlogs(page, ctx.request.query.category)
    }
    ctx.success(data)
})

router.post("/", async (ctx) => {
    let blog = ctx.request.body
    blog.author = ctx.state.auth.username;
    await blogController.addBlog(blog);
    ctx.success()
})

router.post("/addReadCount", async (ctx) => {
    let id = ctx.request.body.id
    await blogController.addReadCount(id);
    ctx.success()
})

router.put("/", async (ctx) => {
    let id = ctx.request.query.id
    await blogController.updateBlogById(id, ctx.request.body)
    ctx.success()
})


router.delete("/", async (ctx) => {
    let id = ctx.request.query.id
    await blogController.deleteBlog(id)
    ctx.success()
})


module.exports = router