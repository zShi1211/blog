const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const koaCompress = require('koa-compress')

const { getErrorResult } = require('./utils/getResult')

const adminMiddle = require('./api/admin')
const articleMiddle = require('./api/article')
const debrisWordMiddle = require('./api/debrisWord')
const homeMiddle = require('./api/home')
const leavaWordMiddle = require('./api/leavaWord')
const uploadMiddle = require('./api/upload')

const app = new Koa();

// 使用gzip
app.use(koaCompress({
    filter(content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    gzip: {
        flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false // disable brotli
}))

// 托管静态资源
// app.use(koaStatic(path.resolve(__dirname, "../public")))
// 打包只要要写这个地址
app.use(koaStatic(path.resolve(__dirname, "./public")))


//解析请求体
app.use(bodyParser())

//错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = getErrorResult(err.message);
        } else {
            ctx.status = 500;
            ctx.body = getErrorResult(err.message || err)
        }
    }
})

// 设置路由
app.use(adminMiddle)
app.use(articleMiddle)
app.use(debrisWordMiddle)
app.use(homeMiddle)
app.use(leavaWordMiddle)
app.use(uploadMiddle)

app.listen(1211, () => {
    console.log('服务器连接了')
})