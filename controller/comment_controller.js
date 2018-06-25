'use strict'
const { BlogIdMissError,PageWrongError,BlogNotFoundError} =  require("../model/api_msg")
const Comment = require('../model/comment');
const blogController = require('./blog_controller')
const PageCount = 10
async function createComment(comment) {
    if(comment.blogId){
        //查看blogId是否有效
        let blog = await blogController.getBlogById(comment.blogId)
        if(!blog){
            throw BlogNotFoundError
        }
    }
    await Comment.create(comment);
}

async function getCommentByBlogId(blogId, page = 1) {
    if(!blogId){
        throw BlogIdMissError
    }
    if(page<0){
        throw PageWrongError
    }
    let condition = {blogId: blogId};
    let count = await Comment.count(condition)
    let skip = page<=1 ? 0 : (page-1)*PageCount;
    let comments = await Comment.find(condition).select("-__v").limit(PageCount).skip(skip).sort({'createdAt':-1}).exec()
    return { total: count, comments}
}

module.exports = {
    createComment, getCommentByBlogId
}