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
    res.render('Banner/banner', {title: '图文列表',data: user, route: 'banner'})
})

router.get('/addBanner',function (req,res,next){
    var user = req.cookies.user.user[0]
    res.render('Banner/add_banner', {title: '添加图文', data: user, route: 'addBanner'})
})
router.get('/editBanner',function (req,res,next){
    var user = req.cookies.user.user[0]
    res.render('Banner/edit_banner', {title: '修改图文', data: user, route: 'editBanner'})
})
module.exports = router