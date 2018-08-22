package com.scarlett.web.filter;

import com.scarlett.bean.constant.ConstantCodeKey;
import com.scarlett.common.path.PathUtils;
import net.bull.javamelody.MonitoringFilter;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by admin on 2017/9/12.
 */
public class WebMonitoringFilter extends MonitoringFilter {

    @Override
    protected boolean isAllowed(HttpServletRequest httpRequest, HttpServletResponse httpResponse)
            throws IOException {
        // 判断用户是否登录
        HttpSession session = httpRequest.getSession( );
        String userName = (String) session.getAttribute( ConstantCodeKey.USER_LOGIN_CODE_KEY.getKey( ));
        if ( StringUtils.isEmpty( userName )) {
            String contextPath = httpRequest.getContextPath( );
            String url = PathUtils.combineUrl( contextPath, "backstage", "login", "view" );
            if ( StringUtils.startsWith( url, "/" ) == false ) url = "/" + url;
            httpResponse.sendRedirect( url );

            return false;
        }
        return super.isAllowed(httpRequest, httpResponse);
    }

}
