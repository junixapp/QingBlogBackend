const Koa = require('koa')
const load_md = require('./util/md_loader')
const load_router = require('./util/router_loader')
require('./db')
const config = require('./config')
const app = new Koa();

//init
load_md(app)
load_router(app)

app.listen(config.APP_PORT);

