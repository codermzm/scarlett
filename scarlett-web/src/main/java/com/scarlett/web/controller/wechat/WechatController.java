package com.scarlett.web.controller.wechat;

import com.scarlett.frame.service.wechat.WechatTokenService;
import com.scarlett.frame.service.wechat.utils.CheckModel;
import com.scarlett.web.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by admin on 2017/3/28.
 */
@Controller
@RequestMapping("/wechat")
public class WechatController extends BaseController {

    @Autowired
    private WechatTokenService wechatTokenService;

    /**
     * 开发者模式token校验
     */
    @ResponseBody
    @RequestMapping( value = "validate" )
    public String validate( CheckModel checkModel ) {
        return wechatTokenService.validate( checkModel );
    }

    /**
     * 微信消息的处理
     */
    @RequestMapping( value = "connect" )
    public void connect( HttpServletRequest request, HttpServletResponse response ) throws IOException {

    }

}
