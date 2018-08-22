package com.scarlett.bean.constant;

/**
 * 方一些公共路径
 *
 * Created by mazhiming on 2017/6/14.
 */
public enum ConstantPath {

    // 目录相关
    COMMON_UPLOAD_PATH( "upload", "公共上传路径" ),

    UEDIT_UPLOAD_PATH( "ue_upload", "富文本编辑上传路径" ),

    UEDIT_TEXT_PATH( "ue_text", "富文本编辑文本保存目录" );


    private String path;

    private String detail;

    ConstantPath( String path, String detail ) {
        this.path = path;
        this.detail = detail;
    }

    public String getPath() {
        return path;
    }

    public String getDetail() {
        return detail;
    }
}
