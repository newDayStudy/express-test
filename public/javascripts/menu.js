/**
 * Created by Administrator on 2018/4/14.
 */

!function menu(){
    $('.menu-item').on('click',function () {
        $(this).children('.submenu').slideDown()
        $(this).siblings().children('.submenu').slideUp()
    })
}()