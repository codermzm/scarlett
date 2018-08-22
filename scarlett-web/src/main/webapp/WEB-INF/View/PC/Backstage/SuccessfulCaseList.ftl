<#include "/PC/Backstage/Widget/HomeMacro.ftl">

<@homeTemplate>
<div class="row">
    <div class="col-md-12">
        <!-- BEGIN EXAMPLE TABLE PORTLET-->
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="btn-group">
                                <button id="sample_editable_1_new" class="btn sbold green">
                                    创建
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="btn-group pull-right">
                                <button class="btn green  btn-outline dropdown-toggle" data-toggle="dropdown">Tools
                                    <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu pull-right">
                                    <li>
                                        <a href="javascript:;">
                                            <i class="fa fa-file-pdf-o"></i> 修改 </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i class="fa fa-file-pdf-o"></i> 删除 </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i class="fa fa-file-pdf-o"></i> 升序 </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i class="fa fa-file-pdf-o"></i> 降序 </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <table class="table table-striped table-bordered table-hover table-checkable order-column" id="sample_1">
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox" class="group-checkable" data-set="#sample_1 .checkboxes" />
                        </th>
                        <th> 短标题 </th>
                        <th> 短标题 </th>
                        <th> 类型 </th>
                        <th> 创建时间 </th>
                        <th> 状态 </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="odd gradeX">
                        <td>
                            <input type="checkbox" class="checkboxes" value="1" /> </td>
                        <td> shuxer </td>
                        <td>
                            <a href="mailto:shuxer@gmail.com"> shuxer@gmail.com </a>
                        </td>
                        <td> 120 </td>
                        <td class="center"> 12 Jan 2012 </td>
                        <td>
                            <span class="label label-sm label-success"> Approved </span>
                        </td>
                    </tr>
                    <tr class="odd gradeX">
                        <td>
                            <input type="checkbox" class="checkboxes" value="1" /> </td>
                        <td> looper </td>
                        <td>
                            <a href="mailto:looper90@gmail.com"> looper90@gmail.com </a>
                        </td>
                        <td> 120 </td>
                        <td class="center"> 12.12.2011 </td>
                        <td>
                            <span class="label label-sm label-warning"> Suspended </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- END EXAMPLE TABLE PORTLET-->
    </div>
</div>
<!-- END CONTENT BODY -->

</@homeTemplate>