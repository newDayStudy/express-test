/**
 * Created by Administrator on 2018/4/14.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
    var user = req.cookies.user.user[0]
    res.render('Comment/comment', {title: '评论列表',data: user,route:'comment'})
})

module.exports = router;