<#include "/PC/Backstage/Widget/HomeMacro.ftl">

<@homeTemplate>

<form class="form-horizontal" role="form">
    <fieldset>
        <legend>新建新闻</legend>
        <div class="form-group">
            <label class="col-sm-2 control-label" for="ds_host">标题</label>
            <div class="col-sm-4">
                <input id="news_title" class="form-control" type="text" placeholder="新闻标题"/>
            </div>
            <label class="col-sm-2 control-label" for="ds_name">新闻时间</label>
            <div class="col-sm-4">
                <input id = "news_time" class="form-control form-control-inline input-medium date-picker" size="16" value="" type="text">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">新闻类型</label>
            <div class="col-sm-4">

                <#include "/PC/Backstage/News/NewsTypes.ftl">

            </div>
            <label class="col-sm-2 control-label" for="ds_password">是否置顶</label>
            <div class="col-sm-4">
                <select id="news_is_top" class="form-control">
                    <option value="1">置顶</option>
                    <option value="0" selected = "selected" >非置顶</option>
                </select>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <legend>文件相关</legend>
        <div class="form-group">
            <label class="col-sm-2 control-label">新闻头图</label>
            <div class="col-sm-10">
                <input id="txt_file" url = "" name = "file" class="form-control" type="file" placeholder="新闻头图"/>
            </div>
        </div>
    <#--<div class="form-group">
        <label class="col-sm-2 control-label">富文本编辑</label>
        <div class="col-sm-10">
            <script id="product_describe" name="product_describe" type="text/plain">
            </script>
        </div>
    </div>-->
    </fieldset>
    <div class="form-group">
        <div class="col-sm-10"></div>
        <div class="col-sm-2">
            <button id = "btn_ok" type="button" class="btn btn-success">提交</button>
            <button id = "btn_cancel" type="button" class="btn btn-warning">取消</button>
        </div>
    </div>
</form>
<script type = "text/javascript">
    jQuery( document ).ready( function( ) {
        seajs.use('View/NewsAdd',function( NewsEdit ) {
            NewsEdit.init( )
        })
    })
</script>
</@homeTemplate>
