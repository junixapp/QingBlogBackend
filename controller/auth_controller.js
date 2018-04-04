'use strict'
const { UserNotFoundError,
    UsernameOrPswMissError, UsernameOrPswWrongError, UserAlreadyExistError} = require('../model/api_msg')
const Auth = require('../model/auth')
const User = require('../model/user')
const encrypter = require('../util/encrypter')
const userController = require('./user_controller')
const jwt = require('jsonwebtoken')
const config = require('../config')

async function getAuthByUsername(username) {
    let auth = await Auth.findOne({username: username}).exec()
    if(auth){
        return auth
    }else {
        throw UserNotFoundError
    }
}

async function deleteAuthByUsername(username) {
    return await Auth.remove({username: username}).exec()
}

function checkInput(username, password) {
    if(!username || !password){
        throw UsernameOrPswMissError
    }
}

async function loginUser(username, password) {
    checkInput(username, password)
    //1.check user exist.
    let auth = await getAuthByUsername(username)
    if(auth){
        //2.check
        let encryptPsw = encrypter.encrypt_psw(password, username)
        auth = await Auth.findOne({username: username, password: encryptPsw}).exec()
        if(auth){
            let user = await userController.getUserByUsername(username)

            //jwt token.
            const token = jwt.sign({
                username: user.username
            }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE });
            // 返回给router，router负责将token设置到header中
            return {
                user: user,
                token: token
            }
        }else {
            throw UsernameOrPswWrongError
        }
    }
}

async function registerUser(username, password) {
    checkInput(username, password)
    let auth = await Auth.findOne({username: username}).exec()
    if(!auth){
        let encryptPsw = encrypter.encrypt_psw(password, username)
        await Auth.create({username: username, password: encryptPsw})
        await User.create({username: username})
    }else {
        throw UserAlreadyExistError
    }
}

module.exports = {
    loginUser,
    registerUser,
    deleteAuthByUsername
}