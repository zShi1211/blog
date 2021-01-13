const Router = require('@koa/router')
const { addLeaveWord, addChildLeaveWord, findLeaveWord, removeLeaveWord, removeChildLeaveWord } = require('../../services/leaveWordService')
const { getSendResult } = require('../utils/getResult')
const xssFormat = require('../utils/xssFormat')
const koaJwt = require('koa-jwt')
const secret = require('../secret')

const leavaWordRouter = new Router();

leavaWordRouter.prefix("/api/leavaWord")


// 分页获取留言
leavaWordRouter.get('/', async ctx => {
    const { page, limit } = ctx.query;
    const res = await findLeaveWord(
        +  page,
        +  limit
    );
    ctx.body = getSendResult(res);
})

// 添加一个留言
leavaWordRouter.post('/', async ctx => {
    let { body } = ctx.request
    body = xssFormat(body, "content", 'nickName');
    const res = await addLeaveWord(body);
    ctx.body = getSendResult(res);
})


//评论一条留言
// id为留言的id
leavaWordRouter.post('/:id', async ctx => {
    let { body } = ctx.request
    const { id } = ctx.params;
    body = xssFormat(body, "to", 'nickName', 'content');
    const res = await addChildLeaveWord(id, body);
    ctx.body = getSendResult(res);
})

/* ====================以下需要权限============================== */
// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
leavaWordRouter.use(koaJwt({
    secret, key: "userId"
}))




// 删除一条留言
// id为评论的id
leavaWordRouter.delete('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await removeLeaveWord(id);
    ctx.body = getSendResult(res);
})

//删除一条留言的评论
// id为子评论的id
leavaWordRouter.delete('/:id/comment', async ctx => {
    const { id } = ctx.params;
    const res = await removeChildLeaveWord(id);
    ctx.body = getSendResult(res);
})


module.exports = leavaWordRouter.routes();