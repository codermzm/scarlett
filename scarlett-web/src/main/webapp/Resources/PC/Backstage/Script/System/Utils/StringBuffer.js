define('System/Utils/StringBuffer',function(require, exports, module){

    var ClassFactory 	= require( 'System/Core/ClassFactory' )
    var StringUtils		= require( 'System/Utils/StringUtils' )

    var StringBuffer 	= ClassFactory.defineClass( 'StringBuffer' )

    StringBuffer.addProperties({

        _stream : null

    })

    StringBuffer.addMethods({
        /**
         * 初始化
         * */
        init : function( ){
            this._stream = [ ]
        },

        /**
         * 拼接项
         * @param {String} item
         * @return {Void}
         * */
        append : function( item ){
            if(item instanceof Array)
                for(var i = 0; i < item.length; i++)
                    this._stream.push( item[i] )
            else
                this._stream.push( item )
        },

        size : function( ){
            var streamNumber = 0
            for( var i = 0; i < this._stream.length; i++ )
                streamNumber += this._stream[ i ].length

            return streamNumber
        },

        remove : function( index ){
            var streamIndex = 0 	//当前数组索引
            var streamNumber = 0	//当前字符总数
            //统计出index所在的数组索引
            while( streamNumber < index && streamIndex < this._stream.length )
                streamNumber += this._stream[ streamIndex++ ].length

            //计算出该索引元素对应的位置
            streamNumber = this._stream[ streamIndex ].length - 1 - ( streamNumber - index )
            //删除
            var str1 = this._stream[ streamIndex ].substr( 0, streamNumber )
            var str2 = this._stream[ streamIndex ].substr( streamNumber + 1 )
            this._stream[ streamIndex ] = [str1,str2].join( '' )
        },

        /**
         * 按照索引和长度移除
         * @param {number} 开始索引
         * @param {number} 长度
         **/
        removeRange : function( index, len ){
            throw new Error( '函数未实现!' )
        },

        /**
         * 判断是否以指定字符串开始
         * @param {String} expStr 比较字符串
         * @return {Boolean}
         **/
        startWith : function( expStr ){
            var sourceStr = ( this.size( ) > 0 && this._stream[ 0 ].length > expStr.length ) ? this._stream[ 0 ] : this.toString( )

            return StringUtils.startWith( sourceStr, expStr )
        },

        /**
         * 判断是否以指定字符串结束
         * @param {String} expStr 比较字符串
         * @return {Boolean}
         * */
        endWith  : function( expStr ){
            var sourceStr = ( this.size( ) > 0 && this._stream[ this._stream.length - 1 ].length > expStr.length ) ?
                this._stream[ this.size( ) - 1 ] : this.toString( )

            return StringUtils.endWith( sourceStr, expStr )
        }

    })

    /**
     * 转换字符串
     * @param {Void}
     * @return {String}
     **/
    StringBuffer.getPrototype().toString = function ( ) {
        if(typeof( joinChar ) !== 'string')
            joinChar = ''

        return this._stream.join( joinChar )
    }

    return StringBuffer

})
