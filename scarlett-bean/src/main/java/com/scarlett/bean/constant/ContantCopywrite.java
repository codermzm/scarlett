package com.scarlett.bean.constant;

/**
 * 中的文案全部放到这里
 * Created by mazhiming on 2017/6/14.
 */
public enum ContantCopywrite {

    //region 用户登录相关
    ADMIN_USER_UNREGEDIT ( "USER_UNREGEDIT", "用户未注册"        ),
    ADMIN_PWD_INCORRECT  ( "PWD_INCORRECT" , "用户名或密码错误"  ),
    ADMIN_VERIFY_CODE_INCORRECT  ( "ADMIN_VERIFY_CODE_INCORRECT" , "验证码不正确"  );
    //endregion

    private String key;

    private String describe;

    ContantCopywrite( String key, String describe ) {
        this.key = key;
        this.describe = describe;
    }

    public String getKey( ) {
        return this.key.toUpperCase( );
    }

    public String getDescribe( ) {
        return describe;
    }

}
