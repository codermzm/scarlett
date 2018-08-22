package com.scarlett.web.aspect;

import com.scarlett.bean.constant.ConstantCodeKey;
import com.scarlett.common.path.PathUtils;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by admin on 2017/7/30.
 */
@Aspect
@Component
@Scope( "prototype" )
public class BackstageAspect {

    @Pointcut( "execution(* com.scarlett.web.controller.pc.backstage..*.*(..))" )
    private void aspectjMethod( ){ }

    @Around("aspectjMethod()")
    public Object doAround( ProceedingJoinPoint pjp ) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes( );
        ServletRequestAttributes sra = ( ServletRequestAttributes ) ra;
        HttpServletRequest request = sra.getRequest( );
        HttpServletResponse response = sra.getResponse( );
        HttpSession session = request.getSession( );
        // 从session中获取用户信息
        String userName = (String) session.getAttribute( ConstantCodeKey.USER_LOGIN_CODE_KEY.getKey( ));
        Object result = null;
        if ( StringUtils.isEmpty( userName )) {
            String contextPath = request.getContextPath( );
            String url = PathUtils.combineUrl( contextPath, "backstage", "login", "view" );
            if ( StringUtils.startsWith( url, "/" ) == false ) url = "/" + url;
            response.sendRedirect( url );
        } else {
            result = pjp.proceed( );// result的值就是被拦截方法的返回值
        }

        return result;
    }

}
