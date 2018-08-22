package com.scarlett.web.aspect;

import com.alibaba.fastjson.JSONObject;
import com.scarlett.bean.constant.ConstantCodeKey;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * Created by admin on 2017/3/29.
 */
@Aspect
@Component
@Scope( "prototype" )
public class LogAspect {

    private static final Logger logger = LoggerFactory.getLogger( LogAspect.class );

    private String requestPath = null ; // 请求地址
    private String userName = null ; // 用户名
    private Map<String,String[]> inputParamMap = null ; // 传入参数
    private Object outputParam = null; // 存放输出结果
    private long startTimeMillis = 0; // 开始时间
    private long endTimeMillis = 0; // 结束时间

    @Pointcut("execution(* com.scarlett.web.controller..*.*(..))")
    private void aspectjMethod(){ }

    @Before("aspectjMethod()")
    public void doBeforeInServiceLayer(JoinPoint joinPoint) {
        startTimeMillis = System.currentTimeMillis( ); // 记录方法开始执行的时间
    }

    @After("aspectjMethod()")
    public void doAfterInServiceLayer(JoinPoint joinPoint) {
        endTimeMillis = System.currentTimeMillis( ); // 记录方法执行完成的时间
        this.printOptLog( );
    }

    @Around("aspectjMethod()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes( );
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpServletRequest request = sra.getRequest( );
        HttpSession session = request.getSession( );
        // 从session中获取用户信息
        String loginInfo = (String) session.getAttribute( ConstantCodeKey.USER_LOGIN_CODE_KEY.getKey( ) );
        if(StringUtils.isNotEmpty( loginInfo )){
            userName = loginInfo;
        }else{
            userName = "unknown";
        }
        // 获取输入参数
        inputParamMap = request.getParameterMap( );
        // 获取请求地址
        requestPath = request.getRequestURI( );

        Object result = pjp.proceed( );// result的值就是被拦截方法的返回值
        outputParam = result;

        return result;
    }

    @AfterReturning(value = "aspectjMethod()", returning = "retVal")
    public void afterReturningAdvice(JoinPoint joinPoint, String retVal) { }

    @AfterThrowing(value = "aspectjMethod()", throwing = "ex")
    public void afterThrowingAdvice(JoinPoint joinPoint, Exception ex) { }

    private void printOptLog( ) {
        logger.info( "url:{},user_name:{},param:{},result:{},pro_time:{}ms",
                requestPath, userName,
                JSONObject.toJSONString( inputParamMap ),
                JSONObject.toJSONString( outputParam ),
                (endTimeMillis - startTimeMillis));
    }

}
