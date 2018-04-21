/**
 * Created by Administrator on 2018/4/20.
 */

const multer = require('multer')

const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null, './public/upload')
    },
    filename:function (req,file,cb) {
        cb(null,file.originalname)
    }
})

module.exports = multer({
    storage:storage
})