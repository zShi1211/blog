require('../models/index')
const Mock = require('mockjs')
const Home = require('../models/Home')

const data = Mock.mock({
    description: "@paragraph(20,40)",
    bgImg: "@image(1920x1080)",
    icp: "@cname"
})

console.log('start')
Home.create(data).then(() => {
    console.log('done')
})



