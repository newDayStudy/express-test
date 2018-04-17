/**
 * Created by Administrator on 2018/4/14.
 */

/**
 * Created by Administrator on 2018/4/14.
 */
/**
 * Created by Administrator on 2018/4/14.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
    var user = req.cookies.user.user[0]
    res.render('Notice/notice', {title: '通知列表',data: user,route:'notice'})
})

router.get('/addNotice',function (req,res,next){
    var user = req.cookies.user.user[0]
    res.render('Notice/add_notice', {title: '添加通知', data: user})
})
router.get('/editNotice',function (req,res,next){
    var user = req.cookies.user.user[0]
    res.render('Notice/edit_notice', {title: '修改通知', data: user})
})
module.exports = router