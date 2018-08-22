define('View/UserLogin',function(require, exports, module){

    var PathUtils 	 = require( 'System/Utils/PathUtils' )
    var StringUtils  = require( 'System/Utils/StringUtils' )
    var CookieUtils = require( 'System/Utils/CookieUtils' )

    var cookieUserName = '__cookie__userName'

    exports.init = function () {
        $( '#btn_ok' ).click( function ( ) {
            if ( verify( ) == false )
                return

            var userName = 	$( '#username' ).val( )
            var password = $( '#password' ).val( )

            var param = { }
            param.username = userName
            param.password = password

            $.ajax({
                type : 'POST',
                url : PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'login', 'userLogin' ),
                data : param,
                dataType : 'json',
                success: function( data ){
                    var code = data.code
                    var msg  = data.msg
                    var data = data.data
                    if ( code != 0 ) {
                        $.confirm({
                            title: '错误',
                            content: msg,
                            type: 'orange',
                            theme: 'material',
                            buttons: {
                                ok: {
                                    text: "确定",
                                    btnClass: 'btn-primary',
                                    keys: ['enter'],
                                    action: function( ) {

                                    }
                                }
                            }
                        })

                        return false;
                    }

                    if ( data === false ) {
                        $.confirm({
                            title: '错误',
                            content: msg,
                            type: 'orange',
                            theme: 'material',
                            buttons: {
                                ok: {
                                    text: "确定",
                                    btnClass: 'btn-primary',
                                    keys: ['enter'],
                                    action: function( ) {

                                    }
                                }
                            }
                        })
                    } else {
                        window.location.href= PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'home' )
                    }
                }
            })
        })
    }

    var verify = function( ) {
        var userName = 	$( '#username' ).val( )
        var password = $( '#password' ).val( )

        if ( !userName ) {
            $.confirm({
                title: '错误',
                content: '请出入用户名',
                type: 'orange',
                theme: 'material',
                buttons: {
                    ok: {
                        text: "确定",
                        btnClass: 'btn-primary',
                        keys: ['enter'],
                        action: function( ) {
                            window.setTimeout( function ( ) {
                                $( '#username' ).focus( )
                            }, 0 )
                        }
                    }
                }
            })

            return false
        }

        if ( !password ) {
            $.confirm({
                title: '错误',
                content: '请出入密码',
                type: 'orange',
                theme: 'material',
                buttons: {
                    ok: {
                        text: "确定",
                        btnClass: 'btn-primary',
                        keys: ['enter'],
                        action: function( ) {
                            window.setTimeout( function ( ) {
                                $( '#password' ).focus( )
                            }, 0 )
                        }
                    }
                }
            })

            return false
        }

        return true
    }


})
