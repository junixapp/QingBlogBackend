'use strict'

const { UsernameMissError, UserNotFoundError, DeleteError, AvatarMissError} =  require("../model/api_msg");

const User = require('../model/user')

function checkInput(username) {
    if(!username){
        throw UsernameMissError
    }
}
async function getUserByUsername(username) {
    checkInput(username)
    let user = await User.findOne({username: username}).select("-__v -role").exec()
    if(user){
        return user
    }else {
        throw UserNotFoundError
    }
}

async function deleteUserByUsername(username) {
    checkInput(username)
    let user = await getUserByUsername(username)
    if(user){
        let res = await User.remove({username: username}).exec()
        if(!res){
            throw DeleteError
        }
    }
}

async function updateUserAvatar(username, avatarPath) {
    checkInput(username)
    if(!avatarPath){
        throw AvatarMissError
    }
    await User.update({username: username}, {avatar: avatarPath}).exec()
}

module.exports = {
    getUserByUsername,
    deleteUserByUsername,
    updateUserAvatar
}