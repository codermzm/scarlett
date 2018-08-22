package com.scarlett.frame.service.orm.entity.result;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by admin on 2017/6/24.
 */
public class ResultInfo {

    private Integer code;

    private String msg;

    private Object data;

    public ResultInfo( String str ) {
        JSONObject jsonObject = JSONObject.parseObject( str );
        code = jsonObject.getInteger( "code" );
        msg = jsonObject.getString( "msg" );
        data = jsonObject.get( "data" );
    }

    public ResultInfo( JSONObject jsonObject ) {
        code = jsonObject.getInteger( "code" );
        msg = jsonObject.getString( "msg" );
        data = jsonObject.get( "data" );
    }

    public Boolean isSuccess( ) {
        return ResultStatus.SUCCESS.getKey( ).equals( this.code);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
