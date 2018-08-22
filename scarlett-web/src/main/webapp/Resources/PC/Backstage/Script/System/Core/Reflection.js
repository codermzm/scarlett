define('System/Core/Reflection',function(require, exports, module){

    /**
     * 判断是否为字符串类型
     * */
    var IsString = function(obj){
        return Object.prototype.toString.call(obj) === '[object String]';
    };

    /**
     * 判断是否为数值型
     * */
    var IsNumber = function(obj){
        return Object.prototype.toString.call(obj) === '[object Number]';
    };

    /**
     * 判断是否为数组
     * */
    var IsArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * 判断是否为日期型
     * */
    var IsData = function(obj){
        return Object.prototype.toString.call(obj) === '[object Date]';//日期
    };

    /**
     *判断是否为函数型
     * */
    var IsFunction = function(obj){
        return Object.prototype.toString.call(obj) === '[object Function]';
    };

    /**
     *判断是否为布尔
     * */
    var IsBool = function(obj){
        return Object.prototype.toString.call(obj) === '[object Boolean]';
    };

    /**
     *判断是否为object
     * */
    var IsObject = function(obj){
        return Boolean(obj) && (Object.prototype.toString.call(obj) === '[object Object]');
    };

    /**
     * 判断是否为某个类的实例
     * */
    var IsInstanceof = function(obj,type){
        return obj instanceof type;
    };


    exports.IsArray = IsArray;
    exports.IsString = IsString;
    exports.IsNumber = IsNumber;
    exports.IsArray = IsArray;
    exports.IsData = IsData;
    exports.IsFunction = IsFunction;
    exports.IsBool = IsBool;
    exports.IsObject = IsObject;
    exports.IsInstanceof = IsInstanceof;

})
