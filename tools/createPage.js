/**
 * Created by Administrator on 2018/4/10.
 */


const data = require('./getData')

const http = require('http')
const fs = require('fs')

data(function(arr){
    console.log(arr);
    // return
    arr.forEach(function(url,index){
        http.get(url,function(res){
            var html = '';
            res.setEncoding('utf-8');
            res.on('data',function (chunk) {
                html+= chunk
            })
            res.on('end',function () {
                // console.log(html)
                fs.writeFile(`./news/${index}.html`, html,function (err) {
                   if (err) throw  err;
                   console.log(`新闻${index}.html生成完毕`)
                })
            })

        }).on('error',function(err){
            console.log(`错误信息${err.message}`)
        })
    })
})