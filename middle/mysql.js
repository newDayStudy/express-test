/**
 * Created by Administrator on 2018/4/14.
 */

var mysql = require('mysql')

module.exports = function (sql,params,callback) {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    })

    conn.connect()

    conn.query(sql,params,function (err,data) {
        callback(err,data)
    })

    conn.end()

}

