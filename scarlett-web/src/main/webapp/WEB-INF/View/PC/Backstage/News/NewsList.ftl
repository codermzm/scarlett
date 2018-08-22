<#include "/PC/Backstage/Widget/HomeMacro.ftl">
<@homeTemplate>
<div class="row">
    <div class="panle panel-success">
            <div class="panel-heading">
                <a class="panel-title">新闻列表</a>
            </div>
            <div class="panel-body">
                <table id = "listTable" class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th> 标题 </th>
                        <th> 头图 </th>
                        <th> 类型 </th>
                        <th> 新闻时间 </th>
                        <th> 审核状态 </th>
                        <th> 操作 </th>
                    </tr>
                    </thead>
                    <tbody>
                        <script type="text/x-jquery-tmpl" id="templateTable">
                            <tr class="odd gradeX">
                                <td> {{= title}} </td>
                                <td>
                                    <img height="50" width="200" src="{{= titleImgUrl}}">
                                </td>
                                <td>
                                    <span class="label label-sm label-success">
                                        {{if  type == 1 }}
                                           要闻
                                        {{else type == 2 }}
                                           复试新闻
                                        {{else type == 3 }}
                                           XXX资讯
                                        {{else type == 4 }}
                                            机构资讯
                                        {{else type == 5 }}
                                            公共课资料
                                        {{else type == 6 }}
                                            课真题资料
                                        {{else type == 7 }}
                                            XXX大纲资料
                                        {{else type == 8 }}
                                            调剂新闻
                                        {{else type == 9 }}
                                            英语资料
                                        {{else type == 10 }}
                                            数学资料
                                        {{else type == 11 }}
                                            政治资料
                                        {{else type == 12 }}
                                            调剂分数线
                                        {{else}}
                                           未知新闻类型
                                        {{/if}}
                                    </span>
                                </td>
                                <td>
                                    {{= newsDate}}
                                </td>
                                <td>
                                    <span class="label label-sm label-success">
                                         {{if (status == 0)}}
                                           待审核
                                         {{else(status == 1)}}
                                           在线
                                         {{else}}
                                           已关闭
                                        {{/if}}
                                    </span>
                                </td>
                                <td>
                                    <div class="btn-group" role="group">
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                           状态
                                          <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li><a href="${basePath}/backstage/newsEdit?id={{= id}}">查看详情</a></li>
                                          {{if (status == 0)}}
                                            <li><a href="javascript:void(0);" onclick="window.examine( {{= id}} )" >审批</a></li>
                                          {{else(balance == 1)}}
                                            <li><a href="javascript:void(0);" onclick="window.unExamine( {{= id}} )" >取消审批</a></li>
                                          {{/if}}

                                          {{if (status != 3)}}
                                            <li><a href="javascript:void(0);" onclick="window.closeNews( {{= id}} )">关闭</a></li>
                                          {{else}}
                                            <#--关闭后暂时不能恢复 以免误操作-->
                                          {{/if}}
                                        </ul>
                                      </div>
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          编辑
                                          <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li><a href="${basePath}/backstage/newsEdit?id={{= id}}">修改信息</a></li>
                                          <li><a href="${basePath}/backstage/newsContent?id={{= id}}">编辑内容</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                </td>
                            </tr>
                        </script>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </div>
        </div>
</div>
<div class="row">
    <div id="newsPage"></div>
</div>

<script type = "text/javascript">
    jQuery( document ).ready( function( ) {
        seajs.use('View/NewsList',function( NewsList ) {
            NewsList.init( )
        })
    })
</script>

</@homeTemplate>

