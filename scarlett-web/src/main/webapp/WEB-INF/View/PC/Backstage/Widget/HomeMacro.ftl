<#--后台管理首页模板-->
<#macro homeTemplate>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>XXX后台管理</title>
    <#include "/PC/Backstage/Base/UsingBootstrap.ftl">
</head>
<body>
    <#--头部导航-->
    <#include "/PC/Backstage/Widget/HeaderBar.ftl" />
    <!-- 页面部分 -->
    <div class="container-fluid">
        <#--导航条-->
        <#include "/PC/Backstage/Widget/Navbar.ftl" />
         <div class="col-sm-10">
            <#--填坑-->
            <#nested>
        </div>
    </div>
</body>
</html>
</#macro>
