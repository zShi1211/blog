const Router = require('@koa/router')
const { getSendResult } = require('../utils/getResult')
const koaJwt = require('koa-jwt')
const { addDebrisWord, removeDebrisWord, updateDebrisWord, findOneDebrisWord, findManyDebrisWord } = require('../../services/debrisWordService')

const secret = require('../secret')

const debrisWordRouter = new Router();

debrisWordRouter.prefix("/api/debrisWord")


// 获取一条碎语
debrisWordRouter.get('/:id', async ctx => {
    const { id } = ctx.params
    const res = await findOneDebrisWord(id)
    ctx.body = getSendResult(res);
})

//分页获取评论
debrisWordRouter.get('/', async ctx => {
    const { page, limit } = ctx.query
    const res = await findManyDebrisWord(+page, + limit);
    ctx.body = getSendResult(res);
})



// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
debrisWordRouter.use(koaJwt({
    secret, key: "userId"
}))

/* ================Authorization======================= */

// 添加一条碎语
debrisWordRouter.post('/', async ctx => {
    const { body } = ctx.request
    const res = await addDebrisWord(body)
    ctx.body = getSendResult(res);
})

// 删除一条碎语
debrisWordRouter.delete('/:id', async ctx => {
    const { id } = ctx.params
    const res = await removeDebrisWord(id)
    ctx.body = getSendResult(res);
})

//修改一条碎语
debrisWordRouter.put('/:id', async ctx => {
    const { body } = ctx.request
    const { id } = ctx.params
    const res = await updateDebrisWord(id, body)
    ctx.body = getSendResult(res);
})



module.exports = debrisWordRouter.routes();