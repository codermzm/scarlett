<#assign basePath=request.contextPath />
<#global basePath>
${basePath}
</#global>
<script type = "text/javascript">
	window._baseDir = '${basePath}'
</script>
<#--网站图标-->
<link rel="shortcut icon" href="${basePath}/Resources/favicon.ico" type="image/x-icon" />
<script src="${basePath}/Resources/ThirdpartyLib/Jquery/jquery-1.10.2.js"></script>
<script src="${basePath}/Resources/ThirdpartyLib/Jquery/jquery.tmpl.min.js"></script>
<script src="${basePath}/Resources/ThirdpartyLib/scclass/ClassFactory.js"></script>