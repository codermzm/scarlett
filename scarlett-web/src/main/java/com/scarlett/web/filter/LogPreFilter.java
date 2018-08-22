package com.scarlett.web.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogPreFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(LogPreFilter.class);

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        HttpServletRequest req = (HttpServletRequest) request;

        long timeStart = System.currentTimeMillis();
        // 使用我们自定义的响应包装器来包装原始的ServletResponse
        ResponseWrapper wrapper = new ResponseWrapper((HttpServletResponse) response);
        chain.doFilter(request, wrapper);
        long exeTime = System.currentTimeMillis();

        long netTime = System.currentTimeMillis();
        String handler = wrapper.getContentType( );
        if (StringUtils.startsWithIgnoreCase( handler, "text/html" )) { // 文件,网页类 不输出响应
            logger.info("PreFilter|request:{},remote_addr:{},params:{},finished with time(ms):{},net_time:{}",
                    req.getRequestURI(), req.getRemoteAddr(), logRequests(req),
                    (exeTime - timeStart), netTime - exeTime );

            ServletOutputStream out = response.getOutputStream( );
            out.write( wrapper.getResponseData( ));
            out.flush();
            out.close();
        } else { // 消息类
            String result = new String( wrapper.getResponseData( ), "UTF-8");
            logger.info("PreFilter|request:{},remote_addr:{},params:{},response:{} finished with time(ms):{},net_time:{}",
                    req.getRequestURI(), req.getRemoteAddr(), logRequests(req), result,
                    (exeTime - timeStart), netTime - exeTime );
            PrintWriter out = response.getWriter();
            out.write(result);
            out.flush();
            out.close();
        }
    }

    @Override
    public void destroy() {
    }

    private String logRequests(HttpServletRequest request) {

        StringBuffer logBuffer = new StringBuffer();
        // 获取所有参数
        StringBuffer paramBuffer = new StringBuffer();
        Enumeration<?> enu = request.getParameterNames();
        while (enu.hasMoreElements()) {
            String paraName = (String) enu.nextElement();
            paramBuffer.append(paraName + ": " + request.getParameter(paraName) + " ");
        }
        if (paramBuffer.length() > 0) {
            logBuffer.append("requestParameters:" + paramBuffer.toString());
        }
        return logBuffer.toString();
    }

}