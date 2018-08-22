package com.scarlett.frame.service.orm.entity.result;

/**
 * Created by admin on 2017/6/24.
 */
public enum ResultStatus {

    SUCCESS ( 0, "成功" ),

    ERROR   ( 500, "失败" );

    private Integer key;

    private String describe;

    ResultStatus( Integer key, String describe ) {
        this.key = key;
        this.describe = describe;
    }

    public Integer getKey( ) {
        return this.key;
    }

}
