package com.scarlett.web.exception;

/**
 * Created by admin on 2017/6/27.
 */
public class ParamValidationException extends ControllerException {

    private String paramName;

    public ParamValidationException( String paramName, String message ) {
        super( message );
        this.paramName = paramName;
    }

    public String getParamName() {
        return paramName;
    }
}
