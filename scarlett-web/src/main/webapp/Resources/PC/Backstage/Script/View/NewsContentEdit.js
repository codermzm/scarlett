define('View/NewsContentEdit',function(require, exports, module) {

    var PathUtils   = require('System/Utils/PathUtils'  )
    var StringUtils = require('System/Utils/StringUtils')
    var CookieUtils = require('System/Utils/CookieUtils')
    var DateUtils   = require('System/Utils/DateUtils'  )

    exports.init = function ( ) {
        var editor = UE.getEditor( 'product_describe', {
            initialFrameHeight :500 // 高度
        })

        $( '#btn_save' ).click( function ( ) {
            if ( editor.hasContents( ) === false ) {
                $.confirm({
                    title: '错误',
                    content: '请输入内容',
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
                return
            }
            var contentHtml = editor.getContent( )
            var id = PathUtils.getUrlArguments( 'id' )
            var params = { id : id, content : contentHtml }
            $.ajax({
                type : 'POST',
                url  : PathUtils.combine( PathUtils.getWebRoot( ), 'backstage', 'news', 'saveContent'),
                data : params,
                dataType : 'json',
                success : function( data ) {
                    if ( data.code !== 0 ) {
                        $.confirm({
                            title: '错误',
                            content: '保存失败',
                            type: 'orange',
                            theme: 'material',
                            buttons: {
                                ok: {
                                    text: "确定",
                                    btnClass: 'btn-primary',
                                    keys: ['enter'],
                                    action: function( ) {
                                        window.setTimeout( function ( ) {
                                            var href = PathUtils.combine( PathUtils.getWebRoot( ), 'backstage', 'newsList' )
                                            window.location.href = href
                                        }, 0 )
                                    }
                                }
                            }
                        })
                    } else {
                        $.confirm({
                            title: '信息',
                            content: '保存成功',
                            type: 'orange',
                            theme: 'material',
                            buttons: {
                                ok: {
                                    text: "确定",
                                    btnClass: 'btn-primary',
                                    keys: ['enter'],
                                    action: function( ) {
                                        window.setTimeout( function ( ) {
                                            var href = PathUtils.combine(PathUtils.getWebRoot(), 'backstage', 'newsList')
                                            window.location.href = href
                                        }, 0 )
                                    }
                                }
                            }
                        })
                    }
                }
            })
        })

        $( '#btn_cancel' ).click( function ( ) {
            $.confirm({
                title: '警告',
                content: '取消后数据不能恢复',
                type: 'orange',
                theme: 'material',
                buttons: {
                    ok: {
                        text: "确定",
                        btnClass: 'btn-primary',
                        keys: ['enter'],
                        action: function( ) {
                            window.setTimeout( function ( ) {
                                var href = PathUtils.combine( PathUtils.getWebRoot( ), 'backstage', 'newsList' )
                                window.location.href = href
                            }, 0 )
                        }
                    },
                    cancel: {
                        text: "取消",
                        btnClass: 'btn-orange',
                        keys: ['enter'],
                        action : function( ) {

                        }
                    }
                }
            })
        })

        var id = PathUtils.getUrlArguments( 'id' )
        if ( !id ) {
            $.confirm({
                title: '错误',
                content: 'ID不能为空',
                type: 'orange',
                theme: 'material',
                buttons: {
                    ok: {
                        text: "确定",
                        btnClass: 'btn-primary',
                        keys: ['enter'],
                        action: function(){
                            window.setTimeout( function ( ) {
                                var href = PathUtils.combine(PathUtils.getWebRoot(), 'backstage', 'newsList')
                                window.location.href = href
                            }, 0 )
                        }
                    }
                }
            })
        }
        $.ajax({
            type : 'POST',
            url  : PathUtils.combine( PathUtils.getWebRoot( ), 'backstage', 'news', 'getContent'),
            data : { 'id' : id },
            dataType : 'json',
            success : function( result ) {
                if ( result.code !== 0 ) {
                    $.confirm({
                        title: '错误',
                        content: '获取新闻明细异常',
                        type: 'orange',
                        theme: 'material',
                        buttons: {
                            ok: {
                                text: "确定",
                                btnClass: 'btn-primary',
                                keys: ['enter'],
                                action: function(){
                                    var href = PathUtils.combine( PathUtils.getWebRoot( ), 'backstage', 'newsList' )
                                    window.location.href = href
                                }
                            }
                        }
                    })
                } else {
                    // 编辑器初始化完成再赋值
                    editor.ready(function() {
                        var data = result.data
                        UE.getEditor( 'product_describe' ).setContent( data, false )
                    })
                }
            }
        })

    }

})