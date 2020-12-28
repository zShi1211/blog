require('../models/index')
const Mock = require('mockjs')
const LeaveWord = require('../models/LeaveWord')

const data = Mock.mock({
    'list|10': [{
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
})

console.log('start')
LeaveWord.create(data.list).then(() => {
    console.log('done')
})



