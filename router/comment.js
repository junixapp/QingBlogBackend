'use strict'

const Router = require('koa-router')
const commentController = require('../controller/comment_controller')

const router = new Router({
    prefix: '/api/comments'
})

router.get("/", async (ctx) => {
    let page = ctx.request.query.page || 0;
    let blogId = ctx.request.query.blogId
    let data = await commentController.getCommentByBlogId( blogId,page)
    ctx.success(data)
});

router.post("/", async (ctx) => {
    let comment = ctx.request.body;
    await commentController.createComment(comment);
    ctx.success()
});


module.exports = router