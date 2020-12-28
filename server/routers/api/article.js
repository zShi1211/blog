const Router = require('@koa/router')
const { addArticle, removeArticle, findManyArticle, updateArticle, findOneArticle, findComment, addComment, addChildComment, removeComment,
    removeChildComment } = require('../../services/articleService')
const { getSendResult } = require('../utils/getResult')
const koaJwt = require('koa-jwt')
const xssFormat = require('../utils/xssFormat')
const secret = require('../secret')

const articleRouter = new Router();

articleRouter.prefix("/api/article")

// 获取一篇文章
articleRouter.get('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await findOneArticle(id);
    ctx.body = getSendResult(res);
})

// 分页获取文章
articleRouter.get('/', async ctx => {
    const { page, limit, key } = ctx.query;
    const res = await findManyArticle(+page, + limit, key);
    ctx.body = getSendResult(res);
})

// 分页获取文章的评论
articleRouter.get('/:id/comment', async ctx => {
    const { id } = ctx.params;
    const { page, limit } = ctx.query;
    const res = await findComment(id, {
        page: +page,
        limit: +limit
    });
    ctx.body = getSendResult(res);
})

// 向一篇文章添加一个评论
articleRouter.post('/:id/comment', async ctx => {
    let { body } = ctx.request
    const { id } = ctx.params;
    body = xssFormat(body, "content", 'nickName');
    const res = await addComment(id, body);
    ctx.body = getSendResult(res);
})


//向一条评论添加子评论
// id为文章评论的id
articleRouter.post('/:id/childComment', async ctx => {
    let { body } = ctx.request
    const { id } = ctx.params;
    body = xssFormat(body, "to", 'nickName', 'content');
    const res = await addChildComment(id, body);
    ctx.body = getSendResult(res);
})

/* ====================以下需要权限============================== */
// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
articleRouter.use(koaJwt({
    secret, key: "userId"
}))

// 添加一篇文章
articleRouter.post('/', async ctx => {
    const { body } = ctx.request
    const res = await addArticle(body)
    ctx.body = getSendResult(res);
})

// 删除一篇文章
articleRouter.delete('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await removeArticle(id)
    ctx.body = getSendResult(res);
})


// 修改一篇文章
articleRouter.put('/:id', async ctx => {
    const { body } = ctx.request
    const { id } = ctx.params;
    const res = await updateArticle(id, body);
    ctx.body = getSendResult(res);
})




// 删除一条评论
// id为评论的id
articleRouter.delete('/:id/comment', async ctx => {
    const { id } = ctx.params;
    const res = await removeComment(id);
    ctx.body = getSendResult(res);
})

//删除一条文章的子评论
// id为子评论的id
articleRouter.delete('/:id/childComment', async ctx => {
    const { id } = ctx.params;
    const res = await removeChildComment(id);
    ctx.body = getSendResult(res);
})


module.exports = articleRouter.routes();