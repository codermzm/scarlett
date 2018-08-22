<!DOCTYPE html>
<html>
	<head>
		<title>产品展示</title>
		<#include "/Mobile/Base/Head.ftl">
	</head>
	<body>
		<#include "/Mobile/Base/Header.ftl">
		<section>
			<div class="comp-titwrap">
				<span class="font40 comp-line comp-float"></span>
				<span class="font40 comp-tit comp-float">产品展示</span>
				<span class="font40 comp-line comp-floatr"></span>
			<div class="clearfix"></div>
			<div class="product-picwrap">
				<a href="product-con.html" class="product-item">
					<span class="product-picbox">
						<img src="img/product-pic1.png"/>
					</span>
					<p class="product-text font24 fontwhite">产品展示图一</p>
				</a>
				<a href="product-con.html" class="product-item">
					<span class="product-picbox">
						<img src="img/product-pic2.png"/>
					</span>
					<p class="product-text font24 fontwhite">产品展示图二</p>
				</a>
				<a href="product-con.html" class="product-item">
					<span class="product-picbox">
						<img src="img/product-pic3.png"/>
					</span>
					<p class="product-text font24 fontwhite">产品展示图三</p>
				</a>
				<a href="product-con.html" class="product-item">
					<span class="product-picbox">
						<img src="img/product-pic2.png"/>
					</span>
					<p class="product-text font24 fontwhite">产品展示图四</p>
				</a>
			</div>
			<div class="page-wrap font24 page-center">
				<a href="###" class=" fontcolor-40 page-item page-prev page-float">上一页</a>
				<a href="###" class=" fontcolor-40 page-item page-float">1</a>
				<a href="###" class=" fontcolor-40 page-item page-float">2</a>
				<a href="###" class=" fontcolor-40 page-item page-float">3</a>
				<a href="###" class=" fontcolor-40 page-item page-float">4</a>
				<a href="###" class=" fontcolor-40 page-item page-next page-float">下一页</a>
				<div class="clearfix"></div>
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
