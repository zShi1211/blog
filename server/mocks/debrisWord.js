require('../models/index')
const Mock = require('mockjs')
const DebrisWord = require('../models/DebrisWord')

const data = Mock.mock({
    'list|10': [{
        content: "@cparagraph(10,30)",
    }]
})

console.log('start')
DebrisWord.create(data.list).then(() => {
    console.log('done')
})



