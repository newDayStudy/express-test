var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.isLogin) {
      res.render('index', { title: 'Express' });
  } else {
    res.render('login',{title:'登录页'})
  }

});

module.exports = router;
