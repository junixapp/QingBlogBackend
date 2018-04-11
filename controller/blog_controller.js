'use strict'

const {PageWrongError, NameExistError,
    AddError, UpdateError, DeleteError,
    IdMissError,CategoryMissError,BlogNotFoundError} = require('../model/api_msg');
const Blog = require('../model/blog')
const categoryController = require('./category_controller')

const PageCount = 10

async function getBlogs(page = 1) {
    if(page<0){
        throw PageWrongError
    }

    let count = await Blog.count().exec()
    let skip = page<=1 ? 0 : (page-1)*PageCount
    let blogs = await Blog.find({}).select("-__v").limit(PageCount).skip(skip).sort({'_id':-1}).populate('category').exec()
    return { total: count, blogs: blogs}
}

async function addBlog(blog) {
    //检查是否有同名的blog
    let res1 = await Blog.findOne({title: blog.title}).exec()
    if(res1){
        throw NameExistError
    }

    // 检查是否有category
    if(!blog.category){
        throw CategoryMissError
    }

    let res2 = await Blog.create(blog)
    // category的blogCount增加
    await categoryController.increaseBlogCount(blog.category)

    if (!res2) {
        throw AddError
    }
}

/**
 * 更新博客的内容
 * @param id
 * @param blog
 */
async function updateBlogById(id, blog) {
    if(!id){
        throw IdMissError
    }

    // 检查是否更新了分类
    if(blog.category){
        let oldBlog = await getBlogById(id)
        if(blog.category !== oldBlog.category){
            // 说明分类更改了，将之前的分类的blogCount减去1，新的加1
            await categoryController.decreaseBlogCount(oldBlog.category)
            await categoryController.increaseBlogCount(blog.category)
        }
    }
    let res = await Blog.update({_id: id}, blog).exec()
    if(!res ||  res.nModified === 0){
        throw UpdateError
    }
}

/**
 * 更新博客
 * @param condition
 * @param update
 */
async function updateBlog(condition, update) {
    let res = await Blog.update(condition, update).exec();
    console.log(res);
    if(!res ||  res.nModified === 0){
        throw UpdateError
    }
}

/**
 * 获取博客详情
 * @param id
 * @returns {Promise<void>}
 */
async function getBlogById(id) {
    if(!id){
        throw IdMissError
    }
    let blog = await Blog.findOne({_id: id}).exec()
    if(!blog){
        throw BlogNotFoundError
    }
    return blog
}

async function deleteBlog(id) {
    if(!id){
        throw IdMissError
    }
    let res = await Blog.remove({_id: id}).exec()
    //delete comment!
    if(!res){
        throw DeleteError
    }
}


module.exports = {
    getBlogs,
    addBlog,
    updateBlogById,
    deleteBlog,
    updateBlog,
}