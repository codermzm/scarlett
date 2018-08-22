define('System/Utils/StringUtils',function(require, exports, module){

    /**
     * 判断字符串是否为数字
     * @param {String} 字符串
     * @return {boolean} 是否为数字
     * */
    exports.isNumber = function( str ){
        return !isNaN( str )
    }

    /**
     * 判断字符串是否为空
     * @param {String} str 字符串
     * @return {Boolean} 是否为空
     * */
    exports.isEmpty = function( str ){
        var reg = new RegExp( '^\s*$' )

        return reg.test( str )
    }

    /**
     * 检查字符串是否以指定字符串开始
     * @param {String} str
     * @param {String} expStr
     * @return {Boolean}
     * */
    exports.startWith = function( str, expStr ){
        var reg = new RegExp( "^" + expStr )

        return reg.test( str )
    }

    /**
     * 检查字符串是否以指定字符串结束
     * @param {String} str
     * @param {String} expStr
     * @return {Boolean}
     * */
    exports.endWith  = function( str, expStr ){
        var reg = new RegExp( expStr + "$" )

        return reg.test( str )
    }

    /**
     * 移除指定长度
     * @param {String} str 字符串
     * @param {number} index 开始索引
     * @param {number} len 长度
     * */
    exports.remove = function( str, index, len ){
        var strLen = typeof( len ) === 'number' ? len >= 0 ? len : str.length - index :  str.length - index
        var str1 = str.substr( 0, index + 1 )
        var str2 = str.substr( index + 1 + strLen )

        return [ str1, str2 ].join( '' )
    }

    /**
     * 字符串比较
     * @param {String} str1
     * @param {String} str2
     * @return {Boolean}
     * */
    exports.equals = function( str1, str2 ){
        return str1 == str2
    }

})
