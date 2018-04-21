/**
 * Created by Administrator on 2018/4/14.
 */
/**
 * Created by Administrator on 2018/4/14.
 */
var express = require('express');
var router = express.Router();
var upload = require('../middle/multer')
var path = require('path')
var mysql = require('../middle/mysql')
router.get('/',function (req,res,next) {
    var user = req.cookies.user.user[0]
    var num = req.query.page || 1// 第几页
    var pageSize = 10
    var start_num = num > 1 ? pageSize*num - 1: 0
    var end_num = num > 1 ? pageSize*num - 1 : pageSize
    mysql('select id, name, src, start_time, update_time from banner',[], function (err,data) {
        if (err) {
            res.render('error',{error: err, message: ''})
            return
        }
        mysql('select banner.id, banner.name, banner.src, banner.start_time, banner.update_time, banner_tag.slug from banner,banner_tag where banner.tag_id = banner_tag.id limit ?, ?',[start_num, end_num], function (err1, data1) {
            if (err1) {
                res.render('error',{error: err1, message: ''})
                return
            }
            console.log(data1)
            // 总记录数
            var totalRecord = data.length
            // 总页数
            var totalPage = totalRecord % pageSize ? parseInt(totalRecord / pageSize) + 1 : totalRecord / pageSize
            var totalData = {
                totalRecord: totalRecord,
                totalPage: totalPage,
                total: data1,
                num: num
            }
            res.render('Banner/banner', {title: '图文列表',data: user, route: 'banner', banner: totalData})
        })

    })
})

router.get('/addBanner',function (req,res,next){
    var user = req.cookies.user.user[0]
    mysql('select id,name,slug from banner_tag',[],function(err, data){
        if (err) {
            res.render('error',{error: err,message: ''})
            return
        }
        console.log(data)
        res.render('Banner/add_banner', {title: '添加图文', data: user, route: 'addBanner',tag: data})
    })
})
router.post('/submitBanner',upload.single('banner'),function (req,res,next) {
    var user = req.cookies.user.user[0]
    var name = req.body.title
    var src = '/upload/'+ req.file.originalname
    var tag_id = req.body.position
    var start_time = new Date()
    mysql('insert into banner (name,src,start_time,update_time,tag_id) values(?,?,?,?,?)',[name, src,start_time,start_time,tag_id], function (err, data) {
        if (err) {
            res.render('error')
            return
        }
        res.redirect('/banner')
    })
})
router.post('/uploads', upload.array('banner', 12),function (req,res,next) {
    console.log(req.files)
})
router.get('/viewBanner',function (req,res,next) {
    var id = req.query.id
    var user = req.cookies.user.user[0]
    console.log(id)
    mysql('select id, name, src, start_time, update_time, source from article where id = ?',[id],function (err,data) {
        if (err) {
            res.render('error')
            return
        }
        console.log(data)
        res.render('Banner/view_banner', {title: 'banner详情', data: user, route: 'banner', banner: data[0]})
    })
})
router.get('/delBanner',function (req,res,next) {
    var id = req.query.id
    var user = req.cookies.user.user[0]
    mysql('delete from banner where id = ?',[id],function (err,data) {
        if (err) {
            res.render('error')
            return
        }
        res.redirect('/banner')
    })
})
router.get('/editBanner',function (req,res,next){
    var user = req.cookies.user.user[0]
    res.render('Banner/edit_banner', {title: '修改图文', data: user, route: 'editBanner'})
})
module.exports = router