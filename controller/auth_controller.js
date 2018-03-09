'use strict'
const {TokenMissError, TokenInvalidError, TokenNotFoundError, UserNotFoundError,
    UsernameOrPswMissError, UsernameOrPswWrongError, UserAlreadyExistError} = require('../model/api_msg')
const Auth = require('../model/auth')
const User = require('../model/user')
const encrypter = require('../util/encrypter')
const userController = require('./user_controller')

//token有效期
const TokenExpire = 1000 * 60 * 60 * 24

async function checkToken(token) {
    if (token) {
        //1.find token.
        let auth = await Auth.findOne({token: token}).select("-__v").exec()
        if (auth) {
            //2.check expire
            if (auth.expire < Date.now()) {
                throw TokenInvalidError
            }
            return auth
        } else {
            // wrong token.
            throw TokenNotFoundError
        }
    } else {
        throw TokenMissError
    }
}

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

            //gen token.
            let token = encrypter.genToken(username)
            let expire = Date.now() + TokenExpire
            await Auth.update({username: username}, {token: token, expire: expire}).exec()
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
    checkToken,
    loginUser,
    registerUser,
    deleteAuthByUsername
}