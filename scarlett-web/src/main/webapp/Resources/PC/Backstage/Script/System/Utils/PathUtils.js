define('System/Utils/PathUtils',function(require, exports, module){

    var StringUtils = require( 'System/Utils/StringUtils' )

    /**获取网站根路径
     * @return 网站根路径
     * */
    var getWebRoot = function( ){
        return window._baseDir
    }

    /**
     * 合并路径
     * */
    var combine = function(  ){
        if( !arguments || arguments.length <= 0 )
            return

        var pathArray = [ ]
        for( var i = 0; i < arguments.length; i++ ){
            if( pathArray.length > 0 && !StringUtils.endWith( pathArray[ pathArray.length - 1 ], '/' ) && !StringUtils.startWith( arguments[i],'/' ) )
                pathArray.push( '/' )

            pathArray.push( arguments[i] )
        }

        return pathArray.join( '' )
    }

    var getUrlArguments = function( k ) {
        var result = { }
        var url    = location.search
        // 获取url中"?"符后的字串
        if ( url.indexOf( '?' ) !== -1 ) {
            var str  = url.substr( 1 )
            var strs = str.split( '&' )
            for( var i = 0; i < strs.length; i++ ) {
                var str   = strs[ i ].split( '=' )
                var key   = str[ 0 ];
                var value = str[ 1 ];
                result[ key ] = value
            }
        }

        if ( typeof( k ) !== 'undefined' ) {
            return result[ k ]
        }

        return result;
    }

    exports.combine		= combine
    exports.getWebRoot  = getWebRoot
    exports.getUrlArguments = getUrlArguments

})
