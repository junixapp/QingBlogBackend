'use strict'

const { NameExistError, AddError, UpdateError, DeleteError,PageWrongError} =  require("../model/api_msg")
const Blog = require('../model/blog')
const Category = require('../model/category')
const blogController = require('./blog_controller')
const PageCount = 10
async function checkNameExist(name) {
    let cate = await Category.findOne({name: name}).exec()
    if(cate){
        throw NameExistError
    }
}

async function getAllCategory() {
    let count = await Category.count().exec()
    let categories = await Category.find({}).select("-__v").sort({'_id':-1}).exec()
    return { total: count, categories: categories}
}
async function getCategoriesByPage(page = 1) {
    if(page<0){
        throw PageWrongError
    }
    let count = await Category.count().exec()
    let skip = page<=1 ? 0 : (page-1)*PageCount
    let categories = await Category.find({}).select("-__v").limit(PageCount).skip(skip).sort({'_id':-1}).exec()
    return { total: count, categories: categories}
}

async function addCategory(name) {
    await checkNameExist(name)
    let res = await Category.create({name: name})
    if(!res){
        throw AddError
    }
    return res
}

/**
 * update 为更新的属性对象
 * @param id
 * @param update
 */
async function updateCategory(id, update) {
    // 修改成功：{ n: 1, nModified: 1, ok: 1 }
    let res = await Category.update({_id: id}, update)
    if(!res || res.nModified === 0){
        throw UpdateError
    }
}


/**
 * 将blogCount数量增加1
 * @param id
 */
async function increaseBlogCount(id) {
    let c = await getCategoryById(id) // 返回的c不是model对象
    let count = c.blogCount || 0
    await updateCategory(c._id, {blogCount: count+1})
}

/**
 * 将blogCount数量减少1
 * @param id
 */
async function decreaseBlogCount(id) {
    let c = await getCategoryById(id) // 返回的c不是model对象
    if(c && c.blogCount > 0){
        await updateCategory(c._id, {blogCount: c.blogCount - 1})
    }

}

async function deleteCategory(id) {
    let res = await Category.remove({_id: id}).exec();

    // await blogController.updateBlog({category: id},{category: null});
    //  blogController.updateBlog();
    await Blog.update({category: id},{category: null}).exec();
    console.log(res);
    if(!res){
        throw DeleteError
    }
}

async function getCategoryById(id) {
    return await Category.findOne({_id: id}).exec()
}

module.exports = {
    getAllCategory,
    getCategoriesByPage,
    addCategory,
    updateCategory,
    deleteCategory,
    increaseBlogCount,
    decreaseBlogCount
}