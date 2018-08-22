define('View/ProductList',function(require, exports, module) {

    var PathUtils = require('System/Utils/PathUtils')
    var StringUtils = require('System/Utils/StringUtils')
    var CookieUtils = require('System/Utils/CookieUtils')

    exports.init = function ( ) {
        $('#sample_editable_1_new').click(function () {
            show_create_view( )
        })
    }

    var show_create_view = function ( ) {
        window.location.href= PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'productAdd' )
    }

})