<!-- 页面部分 -->
<div class="col-sm-2">

    <div class="panel-group" id="box">
        <div class="panel panel-success">
            <div class="panel-heading">
                <a href="#collapseA" data-parent="#box" data-toggle="collapse" class="panel-title">新闻管理</a>
            </div>
            <div class="panel-collapse collapse in" id="collapseA">
                <div class="panel-body">
                    <ul class="nav nav-pills nav-stacked">
                        <li><a href="${basePath}/backstage/newsList">新闻列表</a></li>
                        <li><a href="${basePath}/backstage/newsAdd">新闻添加</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="panel panel-success">
            <div class="panel-heading">
                <a href="#collapseB" data-parent="#box" data-toggle="collapse" class="panel-title">系统管理</a>
            </div>
            <div class="panel-collapse collapse" id="collapseB">
                <div class="panel-body">
                    <ul class="nav nav-pills nav-stacked">
                        <li><a href="${basePath}/monitoring" target="_Blank">系统监控</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <#--<div class="panel panel-success">
            <div class="panel-heading">
                <a href="#collapseB" data-parent="#box" data-toggle="collapse" class="panel-title">产品管理</a>
            </div>
            <div class="panel-collapse collapse" id="collapseB">
                <div class="panel-body">
                    <ul class="nav nav-pills nav-stacked">
                        <li><a href="#">产品列表</a></li>
                        <li><a href="#">产品添加</a></li>
                        <li><a href="#">产品删除</a></li>
                    </ul>
                </div>
            </div>
        </div>-->

       <#-- <div class="panel panel-success">
            <div class="panel-heading">
                <a href="#collapseC" data-parent="#box" data-toggle="collapse" class="panel-title">用户管理</a>
            </div>
            <div class="panel-collapse collapse" id="collapseC">
                <div class="panel-body">
                    <ul class="nav nav-pills nav-stacked">
                        <li><a href="#">用户列表</a></li>
                        <li><a href="#">用户添加</a></li>
                        <li><a href="#">用户删除</a></li>
                    </ul>
                </div>
            </div>
        </div>-->
    </div>
</div>