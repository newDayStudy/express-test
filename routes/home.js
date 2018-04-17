var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.cookies.user.user[0];
  console.log(user)
  res.render('home',{title:'首页',data: user,});
});

module.exports = router;
