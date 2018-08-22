<!DOCTYPE html>
<html>
	<head>
		<title>产品详情</title>
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
				<span class="product-item">
					<span class="product-picbox">
						<img src="img/product-pic1.png"/>
					</span>
					<p class="product-text font24 fontwhite">产品展示图一</p>
				</span>
			</div>
			<ul class="product-notewrap">
				<li class="product-noteitem font24">产品名称：</li>
				<li class="product-noteitem font24">产品单位：</li>
				<li class="product-noteitem font24">产品规格：</li>
				<li class="product-noteitem font24">产品价格：</li>
				<div class="clearfix"></div>
			</ul>
			<div class="product-textwrap font24">
				<p class="product-textitem">
					山东临网网络科技有限公司起始于2008年。公司总部设立于国家级经济技术开发区中印软件产业园（临沂云计算中心）。公司云集了一支专业、专注、高素质、高标准的互联网精英团队。我们以奉献网络科技而缩短人际沟通距离为目标，全心致力于企事业单位建站和电子商务的应用及推广，重塑企业高端网络形象，为企业产品推广文化发展提供全方位的服务和帮助。
				</p>
				<p class="product-textitem bottom-line padding-bottom">
					公司业务涵盖品牌网站建设、搜索引擎优化、应用软件开发、电子商务培训、电商平台搭建和广告设计制作等。我们将一直秉承"技术创新，诚信服务"的原则，坚持不懈走技术、创新路线，诚信合作，高效服务于各行业领域，结合行业运营，优化技术，精细运作，将服务理念通过技术执行得以更有效的体现，最大化实现企业价值，加速网络事业的快速发展。
				</p>
			</div>
			<div class="page-wrap">
				<a href="###" class=" page-item page-prev fontcolor-40 font24">下一篇：张小龙刚刚在朋友圈秀了一张照片，小程序“炸裂”了</a>
				<a href="###" class=" page-item page-next fontcolor-40 font24">上一篇：关于“罗一笑”捐款文刷屏的一些思考</a>
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
