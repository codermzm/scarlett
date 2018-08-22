<#include "/PC/Backstage/Widget/HomeMacro.ftl">

<@homeTemplate>

<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default">
            <div class="panel-body">
                <button id = "btn_save" type="button" class="btn btn-success">提交</button>
                <button id = "btn_cancel" type="button" class="btn btn-warning">取消</button>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-12">
        <script id="product_describe" name="product_describe" type="text/plain">
        </script>
    </div>
</div>
<script type = "text/javascript">
    jQuery( document ).ready( function( ) {
        seajs.use('View/NewsContentEdit',function( NewsContentEdit ) {
            NewsContentEdit.init( )
        })
    })
</script>
</@homeTemplate>