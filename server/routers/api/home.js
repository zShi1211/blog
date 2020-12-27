const Router = require('@koa/router')
const { getSendResult } = require('../utils/getResult')
const koaJwt = require('koa-jwt')
const { findHome, addHome, removeHome, updateHome } = require('../../services/homeService')

const secret = require('../secret')

const homeRouter = new Router();

homeRouter.prefix("/api/home")


// 获取首页信息
homeRouter.get('/', async ctx => {
    const res = await findHome()
    ctx.body = getSendResult(res);
})



// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
homeRouter.use(koaJwt({
    secret, key: "userId"
}))

/* ================Authorization======================= */

// 添加首屏信息
homeRouter.post('/', async ctx => {
    const { body } = ctx.request
    const res = await addHome(body)
    ctx.body = getSendResult(res);
})

// 删除首屏信息
homeRouter.delete('/', async ctx => {
    const res = await removeHome()
    ctx.body = getSendResult(res);
})

//修改首屏信息
homeRouter.put('/', async ctx => {
    const { body } = ctx.request
    const res = await updateHome(body)
    ctx.body = getSendResult(res);
})



module.exports = homeRouter.routes();