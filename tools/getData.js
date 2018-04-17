/**
 * Created by Administrator on 2018/4/10.
 */


const http = require('http');
const url = 'http://news.163.com/domestic';

// const url = 'http://wn.pos.baidu.com/adx.php';
var cheerio = require('cheerio')
module.exports = function (callback) {
    http.get(url, function(res){
        var html = '';
        var dataArr = []
        res.setEncoding('utf-8') // 设置字符编码
        // 监听数据
        res.on('data', function(chunk){
            html += chunk
        })
        // 监听数据结束
        res.on('end', function(){
            console.log(html)
            var $ = cheerio.load(html);
            $('.clearfix a').each(function(){
                const newUrl = $(this).attr('href')
                var reg = /^http:\/\//
                if (newUrl && newUrl.match(reg)) {
                    console.log(newUrl)
                    dataArr.push(newUrl)
                }
            })
            callback(dataArr)
        })
    }).on('error',function(err){
        console.log(err)
    })
}
