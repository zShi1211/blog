require('../models/index')
const Mock = require('mockjs')
const Article = require('../models/Article')

const data = Mock.mock({
    'list|10': [{
        title: '@ctitle(4,6)',
        content: "@cparagraph(1000,1500)",
        read: "@natural(50, 100)",
        like: "@natural(50, 100)",
        picture: "@image(720x300)",
        words: "@natural(1000,1500)",
        contentHtml: "@cparagraph(1000,1500)",
        "comment|3": [{
            content: "@cparagraph(10,30)",
            avatar: "@image(50x50)",
            nickName: "@cname",
            "childComment|5": [{
                to: "@cname",
                from: {
                    nickName: '@cname',
                    avatar: "@image(50x50)",
                },
                content: "@cparagraph(10,30)",
            }],
        }]
    }]
})

console.log('start')
Article.create(data.list).then(() => {
    console.log('done')
})



