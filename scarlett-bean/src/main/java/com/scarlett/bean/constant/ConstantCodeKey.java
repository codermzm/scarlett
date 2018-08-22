package com.scarlett.bean.constant;

/**
 * Created by admin on 2017/5/6.
 * 验证码临时存数key
 */
public enum ConstantCodeKey {

    // 验证码Key
    VERIFICATION_CODE_KEY( "__VerificationCode__", "验证码" ),

    // 用户存放key
    USER_LOGIN_CODE_KEY( "__UserLoginCode__", "用户登录key" ),

    // properties
    UPLOAD_FILE_KEY( "file.dir", "文件上传根目录" ),

    FILE_SERVER_URL( "file.server.url", "服务器请求路径" );

    private String key;

    private String describe;

    ConstantCodeKey( String key, String describe ) {
        this.key = key;
        this.describe = describe;
    }

    public String getKey( ) {
        return this.key;
    }

}
