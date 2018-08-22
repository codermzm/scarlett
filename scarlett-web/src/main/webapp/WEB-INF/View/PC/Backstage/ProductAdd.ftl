<#include "/PC/Backstage/Widget/HomeMacro.ftl">


<!-- 实例化编辑器 -->
<script type="text/javascript">
    var ue = UE.getEditor('container');
</script>
<@homeTemplate>

<div class="row">
    <div class="col-lg-2">
    </div>
    <div class="col-lg-8">

        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">产品短标题</span>
            <input type="text" name = "mini_title" class="form-control" placeholder="标题" aria-describedby="basic-addon1">
        </div>
        <br/>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">长标题</span>
            <input type="text" name = "title" class="form-control" placeholder="长标题" aria-describedby="basic-addon1">
        </div>
        <br/>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">长标题</span>
            <input type="text" name = "title" class="form-control" placeholder="长标题" aria-describedby="basic-addon1">
        </div>
        <br/>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">描述</span>
            <input type="text" name = "title" class="form-control" placeholder="描述" aria-describedby="basic-addon1">
        </div>
        <br/>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">大图</span>
            <input type="text" name = "title" class="form-control" placeholder="大图" aria-describedby="basic-addon1">
        </div>
        <br/>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">级别</span>
            <input type="text" name = "level" class="form-control" placeholder="级别" aria-describedby="basic-addon1">
        </div>
        <br/>

        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">图文描述标题</span>
            <input type="text" name = "level" class="form-control" placeholder="图文描述标题" aria-describedby="basic-addon1">
        </div>
        <br/>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">图文描述</span>
            <#--<input type="text" name = "product_describe" class="form-control" placeholder="图文描述" aria-describedby="basic-addon1">-->
        </div>
        <script id="product_describe" name="product_describe" type="text/plain">
        </script>


    </div>
    <div class="col-lg-2">
    </div>
</div>


<script src="${basePath}/Resources/ThirdpartyLib/metronic/assets/scripts/app.js" type="text/javascript"></script>
<script type = "text/javascript">
    jQuery(document).ready(function() {

        var ue = UE.getEditor('product_describe', {
            // initialFrameWidth :800,//设置编辑器宽度
            initialFrameHeight:500,//设置编辑器高度
            scaleEnabled:true
        });

        App.init( )
        seajs.use('View/ProductAdd',function(UserLogin) {
            UserLogin.init( )
        })
    })
</script>

</@homeTemplate>