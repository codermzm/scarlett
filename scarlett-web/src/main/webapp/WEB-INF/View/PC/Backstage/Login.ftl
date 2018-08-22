<html>
<head>
	<title>用户登录</title>
	<#include "/PC/Backstage/Base/UsingBootstrap.ftl">
    <style>
        /*web background*/
        .container{
            display:table;
            height:100%;
        }

        .row{
            display: table-cell;
            vertical-align: middle;
        }
        /* centered columns styles */
        .row-centered {
            text-align:center;
        }
        .col-centered {
            display:inline-block;
            float:none;
            text-align:left;
            margin-right:-4px;
        }
    </style>
</head>
<body >
<div class="container">
    <div class="row row-centered">
        <div class="well col-md-6 col-centered">
            <h2>欢迎登录</h2>
            <div id = "login_form" action="${basePath}/backstage/login/userLogin" method="post" role="form">
                <div class="input-group input-group-md">
                    <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-user" aria-hidden="true"></i></span>
                    <input type="text" class="form-control" id="username" name="username" placeholder="请输入用户名" />
                </div>
				<br/>
                <div class="input-group input-group-md">
                    <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-lock"></i></span>
                    <input type="password" class="form-control" id="password" name="password" placeholder="请输入密码" />
                </div>
                <br />
                <button id = "btn_ok" class="btn btn-success btn-block">登录</button>
            </div>
        </div>
    </div>
</div>

<script type = "text/javascript">
	jQuery( document ).ready( function( ) {
        seajs.use('View/UserLogin',function( UserLogin ) {
            UserLogin.init( )
        })
	})
</script>
</body>
</html>