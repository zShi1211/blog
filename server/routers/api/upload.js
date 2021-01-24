const Router = require('@koa/router');
const multer = require('@koa/multer');
const path = require('path')
const { getSendResult } = require('../utils/getResult')
const uploadRouter = new Router();
const fs = require('fs');


var storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        console.log(process.env.NODE_ENV)
        const filePath = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, "./public/upload") : path.resolve(__dirname, "../../public/upload");
        try {
            const res = await fs.promises.stat(filePath);
            // 如果目录存在就但不是一个目录，创建一个目录
            if (!res.isDirectory()) {
                await fs.promises.mkdir(filePath)
            }
        } catch (error) {
            // 如果目录不存在就会报错，创建一个目录
            await fs.promises.mkdir(filePath)
        }
        cb(null, filePath)
        // 打包后的地址
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}.${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        const whileList = ['.jpg', '.png', 'jpeg', '.gif', '.webp', '.mp3','.jfif'];
        if (whileList.includes(path.extname(file.originalname))) {
            cb(null, true)
        } else {
            cb(new Error(`不支持${path.extname(file.originalname)}扩展名`))
        }
    }
});

uploadRouter.prefix('/api/upload')

uploadRouter.post('/', upload.single('file'), ctx => {
    let url = path.join('/upload', ctx.request.file.filename)
    //将\转换为/
    url = url.replace(/\\\\/g, "\\").replace(/\\/g, '\/')
    ctx.body = getSendResult(url);
})

module.exports = uploadRouter.routes();