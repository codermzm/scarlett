package com.scarlett.web.base;

import java.io.Serializable;

/**
 * Created by admin on 2017/3/25.
 */
public class JsonResult<T extends Object > implements Serializable {

    private Integer code;

    private String msg;

    private T data;

    public JsonResult( ResultStatusEnum resultStatusEnum, T data ) {
        this( resultStatusEnum, "", data );
    }

    public JsonResult( ResultStatusEnum resultStatusEnum, String msg ) {
        this( resultStatusEnum, msg, (T) new Object( ));
    }

    public JsonResult( ResultStatusEnum resultStatusEnum, String msg, T data ) {
        this.code = resultStatusEnum.getKey( );
        this.msg = msg;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public T getData() {
        return data;
    }
}
