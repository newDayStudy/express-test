var express = require('express');
var router = express.Router();
var mysql = require('../middle/mysql')
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.isLogin) {
      res.redirect('/home')
  } else {
      res.render('login', { title: '登录' });
  }
});
router.post('/login', function(req, res, next) {
    const [username, password] = [req.body.username, req.body.password]
    mysql(`select * from user where username=? and password=?`,[username, password],function (err,data) {
        if (err) {
            res.render('error')
        }
        if ( data ){
            res.cookie('isLogin', true)
            res.cookie('user', {user: data})
            res.json({
                code: 1,
                msg:'登录验证通过，正在跳转'
            })
        }
    })
});
router.get('/logout',function (req,res,next) {
    console.log('退出登录')
    res.clearCookie('user')
    res.clearCookie('isLogin')
    res.redirect('/')
})
module.exports = router;
