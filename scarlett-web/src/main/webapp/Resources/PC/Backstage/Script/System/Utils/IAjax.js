define('System/Utils/IAjax',function(require, exports, module) {

    /**
     * 带有消息的请求
     * */
    var msgHandlerPost = function( url, params, beforeMsg ) {

    }

    /**
     * 仅提示错误消息
     * */
    var errorMsgHandlerPost = function( url, params ) {

    }

    exports.msgHandlerPost      = msgHandlerPost
    exports.errorMsgHandlerPost = errorMsgHandlerPost
})