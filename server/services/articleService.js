const { Article } = require('../models')
const articleValidate = require('./validate/articleValidate')
const { commentValidate, childCommentValidate } = require('./validate/commentValidate')

// 添加一篇文章
exports.addArticle = async (articleObj) => {
    const res = articleValidate(articleObj);
    if (res) {
        throw res;
    }
    return await Article.create(articleObj)
}

// 删除一篇文章
exports.removeArticle = async (_id) => {
    return await Article.deleteOne({ _id })
}

// 修改一篇文章
exports.updateArticle = async (_id, articleObj) => {
    const res = articleValidate(articleObj);
    if (res) {
        throw res;
    }
    return await Article.updateOne({ _id }, { ...articleObj })
}

// 查询一篇文章
exports.findOneArticle = async (_id) => {
    return await Article.findById(_id, "-comment")
}

// 分页查询文章
exports.findManyArticle = async (page = 1, limit = 5, condition = '') => {
    const reg = new RegExp(condition);
    const filter = {
        title: reg
    }
    const count = await Article.countDocuments(filter);
    const datas = await Article.find(filter, "-comment").sort({ time: -1 }).skip((page - 1) * limit).limit(limit);
    return {
        count,
        datas
    }
}

// 分页查看文章的评论
exports.findComment = async (id, condition = { page: 1, limit: 10 }) => {
    const article = await Article.findById(id, 'comment');
    const count = article.comment.length;
    let datas = []
    datas = article.comment.slice((condition.page - 1) * condition.limit, condition.limit);
    // 对评论进行升序
    datas.sort((a, b) => a.time - b.time)
    return {
        count,
        datas
    }
}

// 添加一条评论
// id为文章的id
exports.addComment = async (id, commentObj) => {
    const res = commentValidate(commentObj)
    if (res) {
        throw res;
    }
    return await Article.updateOne({ _id: id }, {
        $push: {
            comment: commentObj
        }
    })
}

// 添加一条子评论
// id为评论的id
exports.addChildComment = async (id, childCommentObj) => {
    const res = childCommentValidate(childCommentObj)
    if (res) {
        throw res;
    }
    return await Article.updateOne({ "comment._id": id }, {
        $push: {
            "comment.$.childComment": childCommentObj
        }
    })
}

// 删除一条评论
exports.removeComment = async (id) => {
    return await Article.updateOne({ "comment._id": id }, {
        $pull: {
            // 这里选中的必须是一个数组
            comment: {
                // 删除的条件
                _id: id
            }
        }
    })
}

// 删除一条子评论
exports.removeChildComment = async (id) => {
    return await Article.updateOne({ "comment.childComment._id": id }, {
        $pull: {
            // 这里选中的必须是一个数组
            // 这里的$是第几个评论
            "comment.$.childComment": {
                // 删除的条件
                _id: id
            }
        }
    })
}