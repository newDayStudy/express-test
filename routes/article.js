/**
 * Created by Administrator on 2018/4/14.
 */
var express = require('express');
var router = express.Router();
var mysql = require('../middle/mysql.js')

router.get('/',function (req,res,next) {
    var user = req.cookies.user.user[0]
    var num = req.query.page || 1// 第几页
    /**
     *  1  0 - 9
     *  2  10 - 19
     *  3  20 - 29
     *  limit start_num, end_num
     */
    var pageSize = 1
    var start_num = num > 1 ? pageSize*num - 1: 0
    var end_num = num > 1 ? pageSize*num - 1 : pageSize

    mysql('select id, category_id, title, author, source, content, start_time, update_time from article',[],function (err,data) {
        if (err){
            res.render('error')
            return
        }
        mysql('select id, category_id, title, author, source, content, start_time, update_time from article limit ?,? ',[start_num, end_num],function (err1, data1) {
            if (err1) {
                res.render('error')
                return
            }

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
            res.render('Article/article', {title: '文章列表',data: user, route: 'article',article: totalData})
        })

    })
})

router.get('/addArticle',function (req,res,next){
    var user = req.cookies.user.user[0]
    mysql('select id,name from article_cate',[],function (err, data) {
        if (err) {
            res.render('error')
        }
        if (data.length){
            res.render('Article/add_article', {title: '添加文章', data: user, route: 'addArticle',category: data})
        }
    })

})
router.post('/submitArticle',function (req,res,next) {
    var data = req.body
    var category_id = data.category_id
    var title = data.title
    var author = data.author
    var source = data.source
    var important = data.important
    var content = data.content
    var date = new Date()
    mysql('insert into article (category_id,title,author,source,important,content,start_time,update_time) values(?,?,?,?,?,?,?,?)',
        [category_id,title,author,source,important,content,date,date],function (err,data) {
            if (err) {
                res.render('error')
            }
            if (data) {
                res.json('添加文章成功')
            }
        })
})
router.get('/viewArticle',function (req,res,next) {
    var id = req.query.id
    var user = req.cookies.user.user[0]
    console.log(id)
    mysql('select id, category_id, title, content, important, author, start_time, update_time, source from article where id = ?',[id],function (err,data) {
        if (err) {
            res.render('error')
            return
        }
        console.log(data)


        res.render('Article/view_article', {title: '文章详情', data: user, route: 'article', article: data[0]})
    })
})
router.get('/delArticle',function (req,res,next) {
    var id = req.query.id
    var user = req.cookies.user.user[0]
    mysql('delete from article where id = ?',[id],function (err,data) {
        if (err) {
            res.render('error')
            return
        }
        res.redirect('/article')
    })
})
router.get('/editArticle',function (req,res,next){
    var user = req.cookies.user.user[0]
    res.render('Article/edit_article', {title: '修改文章', data: user,route: 'editArticle'})
})
module.exports = router