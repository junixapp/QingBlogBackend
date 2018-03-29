const Koa = require('koa')
const load_md = require('./util/md_loader')
const load_router = require('./util/router_loader')
const connect_db = require('./db')

const app = new Koa()

//init
load_md(app)
load_router(app)

//connect db
connect_db()

app.listen(80)

