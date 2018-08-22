define('View/NewsList',function(require, exports, module) {

    var PathUtils   = require( 'System/Utils/PathUtils'  )
    var StringUtils = require( 'System/Utils/StringUtils')
    var CookieUtils = require( 'System/Utils/CookieUtils')
    var DateUtils   = require( 'System/Utils/DateUtils'  )

    exports.init = function ( ) {
        var pageNumber = PathUtils.getUrlArguments( 'pageNumber' )
        var pageSize   = PathUtils.getUrlArguments( 'pageSize' )
        if ( !pageNumber ) pageNumber = 1
        if ( !pageSize ) pageSize = 10

        $.ajax({
            type: 'POST',
            url: PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'news', 'list'),
            data: { 'pageNumber' : pageNumber, 'pageSize' : pageSize },
            dataType: 'json',
            success : function( data ) {
                if ( data.code !== 0 ) {
                    return
                }
                var page = data.data
                var listData = page.result
                // 类型转换
                if ( listData instanceof Array ) {
                    for ( var i = 0; i < listData.length; i++ ) {
                        var item = listData[ i ]
                        if ( item ) {
                            var newsDate = item.newsTime
                            var date = new Date( newsDate )
                            var dateFormat = DateUtils.dateFormat( date, "yyyy-MM-dd" )
                            item.newsDate = dateFormat
                        }
                    }
                }

                $( '#templateTable' ).tmpl( listData ).appendTo( '#listTable tbody' )

                $('#newsPage').bPage({
                    //页面跳转的目标位置
                    url : PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'newsList'),
                    //分页数据设置
                    totalPage : page.totalPages,
                    totalRow : page.totalCount,
                    pageSize : page.pageSize,
                    pageNumber : page.pageNo,
                    //页面跳转时需要同时传递给服务端的自定义参数设置
                    params : function( ) {
                        return { }
                    }
                })
            }
        })
    }

    exports.examine = function( id ) {
        $.ajax({
            type: 'POST',
            url: PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'news', 'examine'),
            data: { 'newsId' : id, 'status' : true },
            dataType: 'json',
            success : function( data ) {
                if ( data.code !== 0 ) {
                    $.confirm({
                        title: '错误',
                        content: '审核失败',
                        type: 'orange',
                        theme: 'material',
                        buttons: {
                            ok: {
                                text: "确定",
                                btnClass: 'btn-primary',
                                keys: ['enter'],
                                action: function( ) { }
                            }
                        }
                    })
                } else {
                    $.confirm({
                        title: '提示',
                        content: '审核成功',
                        type: 'orange',
                        theme: 'material',
                        buttons: {
                            ok: {
                                text: "确定",
                                btnClass: 'btn-primary',
                                keys: ['enter'],
                                action: function( ) { }
                            }
                        }
                    })
                }
            }
        })
    }
    exports.unExamine = function( id ) {
        $.ajax({
            type: 'POST',
            url: PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'news', 'examine'),
            data: { 'newsId' : id, 'status' : false },
            dataType: 'json',
            success : function( data ) {
                if ( data.code !== 0 ) {
                    $.confirm({
                        title: '错误',
                        content: '取消审核失败',
                        type: 'orange',
                        theme: 'material',
                        buttons: {
                            ok: {
                                text: "确定",
                                btnClass: 'btn-primary',
                                keys: ['enter'],
                                action: function( ) { }
                            }
                        }
                    })
                } else {
                    $.confirm({
                        title: '提示',
                        content: '取消审核成功',
                        type: 'orange',
                        theme: 'material',
                        buttons: {
                            ok: {
                                text: "确定",
                                btnClass: 'btn-primary',
                                keys: ['enter'],
                                action: function( ) { }
                            }
                        }
                    })
                }
            }
        })
    }

    exports.closeNews = function( id ) {
        $.ajax({
            type: 'POST',
            url: PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'news', 'close'),
            data: { 'newsId' : id },
            dataType: 'json',
            success : function( data ) {
                if ( data.code !== 0 ) {
                    $.confirm({
                        title: '错误',
                        content: '关闭失败',
                        type: 'orange',
                        theme: 'material',
                        buttons: {
                            ok: {
                                text: "确定",
                                btnClass: 'btn-primary',
                                keys: ['enter'],
                                action: function( ) { }
                            }
                        }
                    })
                } else {
                    $.confirm({
                        title: '提示',
                        content: '关闭成功',
                        type: 'orange',
                        theme: 'material',
                        buttons: {
                            ok: {
                                text: "确定",
                                btnClass: 'btn-primary',
                                keys: ['enter'],
                                action: function( ) { }
                            }
                        }
                    })
                }
            }
        })
    }
    
    window.examine = exports.examine
    window.unExamine = exports.unExamine
    window.closeNews = exports.closeNews
})