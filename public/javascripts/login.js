/**
 * Created by Administrator on 2018/4/14.
 */

function login(params,successCallback,errorCallback){
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/login',
        data: params,
        success:function(data){
            successCallback(data)
        },
        error:function (err) {
            errorCallback(err)
        }
    })
}