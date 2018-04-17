/**
 * Created by Administrator on 2018/4/14.
 */

function judeMenu(title) {
    console.log(title)
    var menuItem = $('.menu-item')
    switch (title) {
        case 'banner':
            ani(menuItem, 4, 0)
            break;
        case 'addBanner':
            ani(menuItem, 4, 1)
            break;
        case 'editBanner':
            ani(menuItem, 4, 2)
            break;
        case 'notice':
            ani(menuItem, 2, 0)
            break;
        case 'article':
            ani(menuItem, 1, 0)
            break;
        case 'addArticle':
            ani(menuItem, 1, 1)
            break;
        case 'editArticle':
            ani(menuItem, 1, 2)
            break;
        case 'comment':
            ani(menuItem,3, 0)
            break;
    }
}

function ani(menuItem, idx, index) {
    menuItem.eq(idx).find('.triangle').html('&#xe614;').parent().siblings().find('.triangle').html('&#xe6b7;')
    menuItem.eq(idx).find('ul').addClass('block').children().eq(index).addClass('sub-item-active sub-item-active-line').siblings().removeClass('sub-item-active')
}

