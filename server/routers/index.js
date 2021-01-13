const Koa = require('koa')
const koaStatic = require('koa-static')
const koaStaticCache = require('koa-static-cache')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const { getErrorResult } = require('./utils/getResult')
const adminMiddle = require('./api/admin')
const articleMiddle = require('./api/article')
const debrisWordMiddle = require('./api/debrisWord')
const homeMiddle = require('./api/home')
const leavaWordMiddle = require('./api/leavaWord')
const uploadMiddle = require('./api/upload')
const historyFallback = require('connect-history-api-fallback')
const koaConnect = require('koa-connect')
const fallbackUtil = require('./utils/fallback')

const app = new Koa();

// history模式单页应用
app.use(koaConnect(historyFallback({
    /* 
            由于要把两个单页应用放再同一个服务器，所以在首屏路径请求是/admin开头就交给后台单页应用处理
            请求方法是GET
            想要的要个HTML
            路径中不带.
            就直接给他回退到 /admin/index.html 页面，让路由处理
            */
    rewrites: [
        {
            from: /^\/admin.*$/,
            to: function (context) {
                // 本来可以值给/admin的。koaStatic会自己找到下面的index.html。无奈koaStaticCache不会
                return fallbackUtil(context, '/admin/index.html')
            }
        },
        {
            from: /^\/.*$/,
            to: function (context) {
                return fallbackUtil(context, '/client/index.html')
            }
        }
    ]
})))


// 托管静态资源
const staticPath = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, "./public") : path.resolve(__dirname, "../public")
app.use(koaStaticCache(staticPath, {
    maxAge: 60 * 60 * 24 * 365,
    preload: true,
    dynamic: true
}))


//解析请求体
app.use(bodyParser())

//错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = 200;
        ctx.body = getErrorResult(err.message || err)
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