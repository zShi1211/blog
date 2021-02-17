const Router = require('@koa/router')
const { addAdmin, removeAdmin, updateAdmin, updatePwd, login, whoami } = require('../../services/adminService')
const { getSendResult } = require('../utils/getResult')
const koaJwt = require('koa-jwt')
const JWT = require('jsonwebtoken')

const secret = require('../secret')
const cipher = "c2hpaXNtZQ=="

const adminRouter = new Router();

adminRouter.prefix("/api/admin")

adminRouter.post('/', async ctx => {
    const { body } = ctx.request
    if (body.cipher !== cipher) {
        throw new Error('暗号不正确')
    }
    const res = await addAdmin(body)
    delete res.loginPwd;
    ctx.body = getSendResult(res);
})

adminRouter.post('/login', async ctx => {
    const { body } = ctx.request;
    const res = await login(body);
    if(!res){
        throw new Error('登录失败')
    }
    delete res.loginPwd;
    // jwt加密
    const token = JWT.sign({ id: res._id }, secret);
    ctx.set('Authorization', token);
    ctx.body = getSendResult(res);
})

// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
adminRouter.use(koaJwt({
    secret, key: "userId"
}))

adminRouter.delete('/', async ctx => {
    const { userId } = ctx.state;
    const res = await removeAdmin(userId.id)
    ctx.body = getSendResult(res);
})

adminRouter.put('/', async ctx => {
    const { userId } = ctx.state;
    const { body } = ctx.request
    const res = await updateAdmin(userId.id, body)
    ctx.body = getSendResult(res);
})

adminRouter.put('/pwd', async ctx => {
    const { userId } = ctx.state;
    const { body } = ctx.request
    const res = await updatePwd(userId.id, body)
    ctx.body = getSendResult(res);
})

adminRouter.get('/', async ctx => {
    const { userId } = ctx.state;
    const res = await whoami(userId.id);
    ctx.body = getSendResult(res);
})


module.exports = adminRouter.routes();