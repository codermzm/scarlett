package com.scarlett.web.base;

/**
 * Created by admin on 2017/3/25.
 */
public enum ResultStatusEnum {

    SUCCESS( 0, "SUCCESS" ),

    ERROR( 500, "ERROR" );



    private Integer key;

    private String msg;

    ResultStatusEnum( Integer key, String msg ) {
        this.key = key;
        this.msg = msg;
    }

    public Integer getKey() {
        return key;
    }

    public String getMsg() {
        return msg;
    }
}
