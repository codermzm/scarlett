package com.scarlett.web.base;

import com.alibaba.fastjson.JSONObject;
import com.scarlett.web.exception.ParamValidationException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.TypeMismatchException;
import org.springframework.core.convert.ConversionFailedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by admin on 2017/3/25.
 */
public class BaseController {

    private static final Logger logger = LoggerFactory.getLogger( BaseController.class );

    public <T> JsonResult<T> success( ) {
        return new JsonResult( ResultStatusEnum.SUCCESS, "", new Object( ));
    }

    public <T> JsonResult<T> success( String msg ) {
        return new JsonResult( ResultStatusEnum.SUCCESS, msg, new Object( ));
    }

    public <T> JsonResult<T> success( T data ) {
        return new JsonResult( ResultStatusEnum.SUCCESS, StringUtils.EMPTY, data );
    }

    public <T> JsonResult<T> success( String msg, T data ) {
        return new JsonResult( ResultStatusEnum.SUCCESS, msg, data );
    }

    public <T> JsonResult<T> error( String msg ) {
        return new JsonResult( ResultStatusEnum.ERROR, msg, new Object( ));
    }

    public <T> JsonResult<T> error( T data ) {
        return new JsonResult( ResultStatusEnum.ERROR, StringUtils.EMPTY, data );
    }

    public <T> JsonResult<T> error( ) {
        return new JsonResult( ResultStatusEnum.ERROR, StringUtils.EMPTY, new Object( ));
    }

    @ResponseBody
    @ExceptionHandler( Throwable.class )
    public JsonResult handleException( Throwable e ) {
        logger.error( "system error", e);
        return error( "服务异常，请稍后再试！" );
    }

    @ResponseBody
    @ExceptionHandler( TypeMismatchException.class )
    public JsonResult handleException( TypeMismatchException e ) {
        // 类型 转换失败
        logger.error( "param error,paramValue:{},type:{}", e.getValue( ), e.getRequiredType( ), e );
        return error( "参数类型转换失败,value = " + JSONObject.toJSONString( e.getValue( )));
    }

    @ResponseBody
    @ExceptionHandler( ConversionFailedException.class )
    public JsonResult handleException( ConversionFailedException e ) {
        // 类型 转换失败
        logger.error( "param error,paramValue:{},type:{}", e.getValue( ), e.getTargetType( ), e );
        return error( "参数类型转换失败,value = " + JSONObject.toJSONString( e.getValue( )));
    }

    @ResponseBody
    @ExceptionHandler( MissingServletRequestParameterException.class )
    public JsonResult handleException( MissingServletRequestParameterException e ) {
        // 参数不正确
        logger.error( "param error,paramName:{},type:{}", e.getParameterName( ), e.getParameterType( ), e );
        return error( "参数不正确,paramName = " + e.getParameterName( ));
    }

    @ResponseBody
    @ExceptionHandler( ParamValidationException.class )
    public JsonResult handleException( ParamValidationException e ) {
        // 参数不正确
        logger.error( "param error,paramName:{},msg:{}", e.getParamName( ), e.getMessage( ), e );
        return error( "参数验证失败,paramName:" + e.getParamName( ) + ",msg=" + e.getMessage( ));
    }

    @ResponseBody
    @ExceptionHandler( IllegalArgumentException.class )
    public JsonResult handleException( IllegalArgumentException e ) {
        // 参数不正确
        logger.error( "param error,paramName:{},msg:{}", e.getMessage( ), e );
        return error( "参数验证失败," + e.getMessage( ));
    }

}
