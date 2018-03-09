'use strict'
const fs = require('fs')

function load_router(app = {}) {
    //load all routers.
    const router_dir = process.cwd() + '/router'
    const router_files = fs.readdirSync(router_dir)
    router_files.forEach((f) => {
        const router = require(router_dir + '/' + f)
        app.use(router.routes())
    })
}

module.exports = load_router
