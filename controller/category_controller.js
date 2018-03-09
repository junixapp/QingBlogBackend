'use strict'

const { NameExistError, AddError, UpdateError, DeleteError} =  require("../model/api_msg")

const Category = require('../model/category')
const blogController = require('./blog_controller')

async function checkNameExist(name) {
    let cate = await Category.findOne({name: name}).exec()
    if(cate){
        throw NameExistError
    }
}

async function getAllCategory() {
    return await Category.find({}).select("-__v").exec()
}

async function addCategory(name) {
    await checkNameExist(name)
    let res = await Category.create({name: name})
    if(!res){
        throw AddError
    }
}

async function updateCategory(id, name) {
    await checkNameExist(name)
    let res = await Category.update({_id: id}, {name: name}).exec()
    if(!res){
        throw UpdateError
    }
}

async function deleteCategory(id) {
    let res = await Category.remove({_id: id}).exec()
    //update blog.
    blogController.updateBlog({"category": id},{"category": null})
    if(!res){
        throw DeleteError
    }
}

module.exports = {
    getAllCategory,
    addCategory,
    updateCategory,
    deleteCategory
}