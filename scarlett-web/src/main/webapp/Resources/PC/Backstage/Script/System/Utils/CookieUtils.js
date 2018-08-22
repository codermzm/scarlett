define('System/Utils/CookieUtils',function(require, exports, module){

    //设置cookie
    function setCookie( name, value) {
        if( !cookieEnable( ) ){
            log.error('使用客户端系统变量cookie不能禁用cookie!')
            return false
        }
        var Days = 7
        var exp  = new Date( )
        exp.setTime( exp.getTime( ) + Days * 24 * 60 * 60 * 1000 )
        document.cookie = [ name, '=', escape( value ), ';expires=', exp.toGMTString(), ';path=/' ].join('')

        return true
    }

    //获取cookie
    function getCookie( name ) {
        if( !cookieEnable( ) ){
            log.error('使用客户端系统变量cookie不能禁用cookie!')
        }
        var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
        if( arr = document.cookie.match( reg ) )
            return unescape( arr[ 2 ] )
        else
            return null
    }

    var getSize = function( ){
        var map = getAllCookie( )
        var n, count = 0
        for( n in map ){
            if( map.hasOwnProperty( n ) ){
                count++
            }
        }

        return count
    }

    var getAllCookie = function( ){
        var obj = { }
        var aCookie = document.cookie.split( "; " )
        for ( var i = 0; i < aCookie.length; i++ ) {
            var aCrumb = aCookie[ i ].split( "=" )
            if(aCrumb instanceof Array && aCrumb[ 0 ] !== "" && aCrumb[ 0 ] !== 'JSESSIONID' && aCrumb[ 0 ] !== 'testcookie' && aCrumb[ 0 ] !== 'hy_isinit_cookie'){
                var tempJson = unescape( aCrumb[ 1 ] )
                try{//当做json转
                    tempJson = JSON.parse( tempJson )
                    if(tempJson){
                        obj[ aCrumb[ 0 ] ] = tempJson.value
                    }
                }catch(e){//非json属性 如系统自动产生的
                    obj[ aCrumb[ 0 ] ] = tempJson
                }
            }
        }

        return obj
    }


    function delCookie( name ){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
        var date = new Date( )
        date.setTime( date.getTime( ) - 10000 )
        document.cookie = name + "=a; expires=" + date.toGMTString()
    }

    function cookieEnable(){
        var result = false
        if(navigator.cookiesEnabled)  return true
        var contan = document.cookie;
        document.cookie = "testcookie=yes;"
        var cookieSet = document.cookie
        if (cookieSet.indexOf("testcookie=yes") > -1)
            result=true
        document.cookie = ""

        return result
    }

    exports.getSize 		= getSize
    exports.setCookie 		= setCookie
    exports.getCookie 		= getCookie
    exports.delCookie		= delCookie
    exports.cookieEnable 	= cookieEnable

})
