const Router = require('@koa/router')
const multer = require('@koa/multer');
const uploadRouter = new Router();
const path = require('path')
const { getSendResult } = require('../utils/getResult')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.resolve(__dirname, "../../public/upload"))
        // 打包后的地址
        cb(null, path.resolve(__dirname, "./public/upload"))
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}.${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        const whileList = ['.jpg', '.png', 'jpeg', '.gif', '.webp'];
        console.log(whileList.includes(path.extname(file.originalname)))
        if (whileList.includes(path.extname(file.originalname))) {
            cb(null, true)
        } else {
            cb(new Error(`不支持${path.extname(file.originalname)}扩展名`))
        }
    }
});

uploadRouter.prefix('/api/upload')

uploadRouter.post('/', upload.single('image'), ctx => {
    // const url = path.join(ctx.URL.origin, '/upload', ctx.request.file.filename)
    const url = path.join('/upload', ctx.request.file.filename)
    console.log(url)
    ctx.body = getSendResult(url);
})

module.exports = uploadRouter.routes();