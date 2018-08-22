<!DOCTYPE html>
<html>
	<head>
		<title>在线留言</title>
		<#include "/Mobile/Base/Head.ftl">
	</head>
	<body>
		<#include "/Mobile/Base/Header.ftl">
		<section>
			<div class="comp-titwrap">
				<span class="font40 comp-line comp-float"></span>
				<span class="font40 comp-tit comp-float">在线留言</span>
				<span class="font40 comp-line comp-floatr"></span>
			<div class="clearfix"></div>
			<div class="onlin-conbox">
					<form action="###" target="_blank" id="online-reset">
						<span class="online-conitem">
							<label for="online-name" class="online-contit">您的姓名：</label>
							<input type="text" value="Name" onfocus="if(this.value=='Name'){this.value=''};this.style.color='#666666';"
	onblur="if(this.value==''||this.value=='Name'){this.value='Name';this.style.color='#C4C4C4';}" id="online-name" />
						</span>
						<span class="online-conitem">
							<label for="online-tel" class="online-contit">您的电话：</label>
							<input type="text" value="Tel" onfocus="if(this.value=='Tel'){this.value=''};this.style.color='#666666';"
	onblur="if(this.value==''||this.value=='Tel'){this.value='Tel';this.style.color='#C4C4C4';}" id="online-tel" />
						</span>
						<span class="online-conitem">
							<label for="online-email" class="online-contit">您的邮箱：</label>
							<input type="text" value="E-mail" onfocus="if(this.value=='E-mail'){this.value=''};this.style.color='#666666';"
	onblur="if(this.value==''||this.value=='E-mail'){this.value='E-mail';this.style.color='#C4C4C4';}" id="online-email" />
						</span>
						<span class="online-conitem">
							<label for="online-context" class="online-contit">您的留言：</label>
							<textarea name="" id="online-context" value="Contact" rows="2"> </textarea>
						</span>
					</form>
					<span class="online-conitem online-test">
						<label for="online-test" class="online-contit">验证码：</label>
						<input type="text" value="Test" onfocus="if(this.value=='Test'){this.value=''};this.style.color='#666666';"
onblur="if(this.value==''||this.value=='Test'){this.value='Test';this.style.color='#C4C4C4';}" id="online-test" />
					</span>
					<div class="clearfix"></div>
					<button type="reset" form="online-reset" id="online-resicon">重置内容</button><!--reset重置内容-->
					<button type="submit" form="online-reset" id="online-subicon">提交留言</button><!--submit提交内容-->
				</div>
		</section>
		<#include "/Mobile/Base/Footer.ftl">
	</body>
	<#include "/Mobile/Base/UsingScrpit.ftl">
<script>
	/*字号rem尺寸变化代码*/
	window.onload=window.onresize=function(){
	    document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px'
	};
    /*导航展开收起效果代码*/
    $(document).ready(function () {
            $("#open-icon").click(function () {
                $("#nav-list").slideToggle();
            });
       });
//banner
    TouchSlide({ 
		slideCell:"#focus",
		titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bd ul", 
		effect:"leftLoop", 
		autoPlay:true,//自动播放
		autoPage:true, //自动分页
		switchLoad:"_src" //切换加载，真实图片路径为"_src" 
	});       
</script>	
</html>
