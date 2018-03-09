'use strict'

const {PageMissError, PageWrongError, NameExistError,
    AddError, UpdateError, DeleteError, IdMissError} = require('../model/api_msg')
const Blog = require('../model/blog')

const PageCount = 10

async function getBlogs(page) {
    if(!page){
        throw PageMissError
    }
    if(page<1){
        throw PageWrongError
    }

    let count = await Blog.count().exec()
    let blogs = await Blog.find({}).select("-__v").limit(PageCount).skip((page-1)*PageCount).sort({'_id':-1}).exec()
    return { total: count, blogs: blogs}
}

async function addBlog(blog) {
    //检查是否有同名的blog
    let res1 = await Blog.findOne({title: blog.title}).exec()
    if(res1){
        throw NameExistError
    }

    let res2 = await Blog.create(blog)
    if (!res2) {
        throw AddError
    }
}
async function updateBlog(id, blog) {
    if(!id){
        throw IdMissError
    }
    let res = await Blog.update({_id: id}, blog).exec()
    if(!res){
        throw UpdateError
    }
}

async function deleteBlog(id) {
    if(!id){
        throw IdMissError
    }
    let res = await Blog.remove({_id: id})
    //delete comment!
    if(!res){
        throw DeleteError
    }
}

module.exports = {
    getBlogs,
    addBlog,
    updateBlog,
    deleteBlog
}