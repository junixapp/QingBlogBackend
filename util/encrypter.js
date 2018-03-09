'use strict'

const crypto = require('crypto');
const uuidv1 = require('uuid/v1')
const uuidv4 = require('uuid/v4')


const FixedSalt = "QingBlog"

/**
 * 对密码进行加密
 * @param password
 * @param salt
 * @returns {*|IDBRequest|Promise<void>|void}
 */
function encrypt_psw(password, salt = "") {
    const sha1_hash = crypto.createHash('sha1')
    sha1_hash.update(password)
    sha1_hash.update(salt)
    sha1_hash.update(FixedSalt)
    return sha1_hash.digest('hex')
}

/**
 * 使用username, 固定盐，uuid，生成token
 * @param username
 * @returns {*|PromiseLike<ArrayBuffer>}
 */
function genToken(username) {
    const sha1_hash = crypto.createHash('sha1')
    sha1_hash.update(username)
    sha1_hash.update(uuidv1())
    sha1_hash.update(FixedSalt)
    return sha1_hash.digest('hex')
}

/**
 * 生成不重复的文件名
 */
function genFilename(filename) {
    let subfix = filename.substring(filename.indexOf('.'))
    const md5_hash = crypto.createHash('md5')
    md5_hash.update(uuidv1())
    md5_hash.update(filename)
    md5_hash.update(uuidv4())
    return md5_hash.digest('hex') + subfix
}

module.exports = {
    encrypt_psw,
    genToken,
    genFilename
}