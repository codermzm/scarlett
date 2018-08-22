define('View/NewsEdit',function(require, exports, module) {

    var PathUtils   = require('System/Utils/PathUtils')
    var StringUtils = require('System/Utils/StringUtils')
    var CookieUtils = require('System/Utils/CookieUtils')
    var DateUtils   = require('System/Utils/DateUtils')

    exports.init = function ( ) {

        $("#news_time").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            showMeridian: true,
            pickerPosition: "bottom-left",
            language: 'zh-CN',//中文，需要引用zh-CN.js包
            startView: 2,//月视图
            minView: 2//日期时间选择器所能够提供的最精确的时间选择视图
        });

        var oFileInput = new FileInput( )
        var fileUrl = PathUtils.combine( PathUtils.getWebRoot( ), 'tools', 'file', 'upload')

        // 获取数据
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
                            var href = PathUtils.combine( PathUtils.getWebRoot( ), 'backstage', 'newsList' )
                            window.location.href = href
                        }
                    }
                }
            })
        }

        $.ajax({
            type : 'POST',
            url  : PathUtils.combine( PathUtils.getWebRoot( ), 'backstage', 'news', 'detail'),
            data : { 'newsId' : id },
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
                }

                var data = result.data

                var title = data.title
                var newsTime = data.newsTime
                var newType = data.type
                var isTop = data.isTop
                var titleImgUrl = data.titleImgUrl

                var dateStr = DateUtils.dateFormat( new Date( newsTime ), 'yyyy-MM-dd' )
                $("#news_title").val( title )
                $("#news_time").val( dateStr )
                $("#news_type").val( newType )
                $("#news_is_top").val( isTop )

                oFileInput.setImgUrl( titleImgUrl )
                oFileInput.init( "txt_file", fileUrl )
            }
        })


        // 初始化提交取消按钮
        $( '#btn_ok' ).click( function( ) {
            var newsTitle = $("#news_title").val( )
            var news_time = $("#news_time").val( )
            var news_type = $("#news_type").val( )
            var news_is_top = $("#news_is_top").val( )
            var fileUrl = oFileInput.getImgUrl( )

            if ( !newsTitle ) {
                alert( '新闻标题不能为空' )
            }

            if ( !news_time ) {
                alert( '新闻标题不能为空' )
            }

            var param = { }
            param.title = newsTitle
            param.newsTime = news_time
            param.titleImgUrl = fileUrl
            param.type = news_type
            param.isTop = news_is_top
            param.id = id
            $.ajax({
                type : 'POST',
                url : PathUtils.combine( PathUtils.getWebRoot(), 'backstage', 'news', 'update' ),
                data : param,
                dataType : 'json',
                success: function( data ) {
                    var code = data.code
                    var msg  = data.msg
                    var data = data.data
                    if ( code != 0 ) {
                        $.confirm({
                            title: '错误',
                            content: '请求异常',
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

                        return false;
                    }

                    $.confirm({
                        title: '消息',
                        content: '操作成功',
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

                }
            })

        })
        $("#btn_cancel").click(function(){
            $.confirm({
                title: '消息',
                content: '确定取消吗',
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

    }

    //初始化fileinput
    var FileInput = function ( ) {
        var self = this
        self.imgUrl = ''
        var oFile = { }

        //初始化fileinput控件（第一次初始化）
        oFile.init = function(ctrlName, uploadUrl) {
            var control = $( '#' + ctrlName )
            //初始化上传控件的样式
            control.fileinput({
                language: 'zh', //设置语言
                uploadUrl: uploadUrl, //上传的地址
                allowedFileExtensions: ['jpg', 'png'],//接收的文件后缀
                showUpload: true, //是否显示上传按钮
                showCaption: false,//是否显示标题
                browseClass: "btn btn-primary", //按钮样式
                maxFileCount: 1, //表示允许同时上传的最大文件个数
                enctype: 'multipart/form-data',
                validateInitialCount:true,
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                initialPreview: [ //预览图片的设置
                    '<img width="260px" height="160px" src="'+ self.imgUrl +'" class="file-preview-image" >'
                ]

            }).on("fileuploaded", function ( event, data, previewId, index) {
                var response = data.response
                if ( response.code != 0 ) {
                    alert( "上传失败" )
                    return
                }
                self.imgUrl = response.data

                return true
            });
        }

        oFile.getImgUrl = function ( ) {
            return self.imgUrl
        }

        oFile.setImgUrl = function ( imgUrl ) {
            self.imgUrl = imgUrl
        }

        return oFile;
    };

})