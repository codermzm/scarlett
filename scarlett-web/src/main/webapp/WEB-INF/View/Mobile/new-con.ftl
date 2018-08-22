<!DOCTYPE html>
<html>
	<head>
		<title>新闻内容</title>
		<#include "/Mobile/Base/Head.ftl">
	</head>
	<body>
		<#include "/Mobile/Base/Header.ftl">
		<section>
			<h1 class="new-contit font30">马云判断：未来30年，计划经济会越来越大，数据将成为主导</h1>
			<span class="font18 new-contime">时间：2016-12-16 &nbsp;&nbsp; 发布者：山东临网</span>
			<span class="new-picwrap">
				<img src="img/new-pic.png" alt="" />
			</span>
			<div class="new-textwrap font24">
				<p class="new-textitem fontcolor-60">山东临网注：11月19日，由浙商总会和上海市浙江商会联合举办的“2016世界浙商上海论坛暨上海市浙江商会成立三十周年大会”上，浙商总会会长、上海市浙江商会名誉会长，阿里巴巴集团董事局主席马云表示，中国经济在未来三十年会发生很大的变化，计划经济将越来越大。
“我们要的，是全球化的视野，国际化的能力，我们必须给别人创造价值，必须给别的国家带来税收，带来东方文明。只有这样，浙商才能从昨天的全国化真正变成全球化。”
				</p>
				<p class="new-textitem fontcolor-60">
					以下演讲版本来源于新浪财经。
				</p>
				<p class="new-textitem fontcolor-40">
					浙商真的是个很了不起的群体，我几乎每年都来参加上海浙商总会的年会，每次都能学到很多。我们浙商是最早全国化的，也不能讲全球化。每年大家聚在一起交流、学习，每年感觉到浙商的成长，很重要的一点是我们都愿意花时间学习，每年的年会我们都花那么长时间，大家坐在一个房间里面学习、思考、辩论，我觉得这是浙商与众不同的地方。
				</p>
				<p class="new-textitem fontcolor-40">
					特朗普不会影响中美关系
				</p>
				<p class="new-textitem fontcolor-40">
					其实现在的世界在发生很大的变化，大家能感觉得到。最近这一年来“黑天鹅”事件很多，英国的脱欧，包括特朗普竞当选美国总统，都被称之为黑天鹅事件，但其实背后大家能够感觉得到，我认为特朗普当选美国总统不是一个偶然性事件，是个必然性事件，只是美国的传统精英阶层认为这是个黑天鹅事件而已。
				</p>
				<p class="new-textitem fontcolor-40 padding-bottom bottom-line">
					这个里面你可以看得出来，这次大选是个很经典的商业案例，民主党和共和党竞争过程当中，民主党并没有真正的捍卫或者支持希拉里，他们只是讨厌特朗普，所有的炮弹都是打在特朗普身上，而没有阐释民主党自己到底要干什么。突然有一段时间所有支持特朗普的人好像没了，因为支持希拉里的人都站出来讲，但我那时候隐隐感觉，那帮人可能不愿意跟你辩论，干脆在投票场上见面，事实证明最后这些人扭转了局势。你拥有观点，人家不一定会支持你。所以大家很担心特朗普上台以后是否使得中美关系、世界各种关系有巨大的变化，我个人觉得没有多大的变化，他肯定很难说是美国历史上最好的总统，但肯定不会是最差的总统。我们可以牛吹得很大，在竞选之前可以把自己说得天花乱坠，但看到那张财务报告表的时候，我相信他会冷静下来。
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
