'use strict'
const multer = require('koa-multer')
const encrypter = require('../util/encrypter')
const Router = require('koa-router')
const userController = require('../controller/user_controller')

let storage = multer.diskStorage({
    destination: genDynamicUploadDir(),
    filename: function (req, file, cb) {
        cb(null, encrypter.genFilename(file.originalname))
    }
})

const upload = multer({ storage: storage })

const router = new Router({
    prefix: '/medias'
})

router.post('/', upload.single('avatar'), async (ctx) => {
    // ctx.body = {
    //     path: ctx.req.file.path,
    //     filename: ctx.req.file.filename
    // }
    if(ctx.req.file){
        userController.updateUserAvatar(ctx.state.auth.username, ctx.req.file.path)
        let data = { avatar: ctx.req.file.path}
        ctx.success(data)
    }
})

function genDynamicUploadDir() {
    let root = 'static/upload'
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${root}/${year}/${month}/${day}`
}

module.exports = router