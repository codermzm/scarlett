package com.scarlett.web.controller.tools;

import com.scarlett.bean.constant.ConstantCodeKey;
import com.scarlett.common.verificationcode.VerificationCode;
import com.scarlett.web.exception.ControllerException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 验证码图片服务
 * Created by admin on 2017/6/4.
 */
@Controller
@RequestMapping( "/tools/verification" )
public class VerificationImgController {

    private static final Logger log = LoggerFactory.getLogger(VerificationImgController.class);

    @ResponseBody
    @RequestMapping(value = "/verify")
    public Boolean verify( String verificationCode, HttpServletRequest request) {
        HttpSession session = request.getSession(false) != null ? request.getSession(false) : request.getSession();
        Object key = session.getAttribute( ConstantCodeKey.VERIFICATION_CODE_KEY.getKey( ));
        String keyStr = StringUtils.trim( String.valueOf( key ));
        verificationCode = StringUtils.trim( verificationCode );
        if ( StringUtils.equalsIgnoreCase( verificationCode, keyStr )) {
            return true;
        }

        return false;
    }

    @RequestMapping(value = "/generate")
    public void generate( HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false) != null ? request.getSession(false) : request.getSession();
        String code = VerificationCode.buildAndWrite(response.getOutputStream( ));
        if (StringUtils.isEmpty(code)) {
            log.error("生成验证码为空!");
            throw new ControllerException("生成验证码失败!");
        }

        setResponseHeaders(response);
        session.setAttribute( ConstantCodeKey.VERIFICATION_CODE_KEY.getKey( ), code );
    }

    protected void setResponseHeaders(HttpServletResponse response) {
        response.setContentType("image/png");
        response.setHeader("Cache-Control", "no-cache, no-store");
        response.setHeader("Pragma", "no-cache");
        long time = System.currentTimeMillis();
        response.setDateHeader("Last-Modified", time);
        response.setDateHeader("Date", time);
        response.setDateHeader("Expires", time);
    }

}
