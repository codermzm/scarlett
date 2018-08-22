	<!-- 放Head中 -->
	<#include "/PC/Backstage/Base/UsingBase.ftl">
	
	<meta charset="utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
	<meta content="" name="description"/>
	<meta content="mazm" name="author"/>
	<meta name="MobileOptimized" content="320">
	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN THEME STYLES -->
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/css/style-metronic.css" rel="stylesheet" type="text/css"/>
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/css/plugins.css" rel="stylesheet" type="text/css"/>
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/css/pages/login-soft.css" rel="stylesheet" type="text/css"/>
	<link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/css/custom.css" rel="stylesheet" type="text/css"/>

    <link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" type="text/css"/>
    <link href="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet" type="text/css"/>
	<!-- END THEME STYLES -->

	<!-- BEGIN CORE PLUGINS -->
	<!--[if lt IE 9]>
		<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/respond.min.js"></script>
		<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/excanvas.min.js"></script>
		<![endif]-->
	<#--<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>-->
    <script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/flot/jquery.flot.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/jquery.cokie.min.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap-daterangepicker/moment.min.js" type="text/javascript"></script>
    <script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
    <script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
    <script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/gritter/js/jquery.gritter.js" type="text/javascript"></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<#--<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>-->
    <script src="${basePath}/Resources/ThirdpartyLib/Jquery/jquery.validate.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
	<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/plugins/select2/select2.min.js" type="text/javascript" ></script>
	<!-- END PAGE LEVEL PLUGINS -->

    <!-- 配置文件 -->
    <script type="text/javascript" src="${basePath}/Resources/ThirdpartyLib/ueditor/ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="${basePath}/Resources/ThirdpartyLib/ueditor/ueditor.all.js"></script>
	<script type="text/javascript" src="${basePath}/Resources/ThirdpartyLib/seajs-2.3.0/sea.js"></script>
	
	<script type = "text/javascript">
		seajs.config({
		  base: "${basePath}/Resources/PC/Backstage/Script",
		  alias: { }
		})


    /*    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        UE.Editor.prototype.getActionUrl = function(action) {
            if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadvideo') {
				var path = window._baseDir + '/tools/ueditor/uploadImage'
                alert( path )
                return path
            } else {
                alert( action )
                return this._bkGetActionUrl.call(this, action);
            }
        }*/

	</script>
	