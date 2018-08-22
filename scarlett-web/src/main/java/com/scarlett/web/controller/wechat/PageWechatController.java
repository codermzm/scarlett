package com.scarlett.web.controller.wechat;

import com.scarlett.web.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by admin on 2017/4/1.
 */
@Controller
@RequestMapping("/wechat/page")
public class PageWechatController extends BaseController {

    private static final String INDEX = "/Mobile/index";
    private static final String COMPANY = "Mobile/company";
    private static final String COMPANY_PIC = "Mobile/company-pic";
    private static final String NEW_CENTER = "Mobile/new-center";
    private static final String NEW_CENTER_CON = "Mobile/new-center-con";
    private static final String ONLINE_MESSAGE = "Mobile/online-message";
    private static final String CONTACT = "Mobile/contact";
    private static final String PRODUCT = "Mobile/product";
    private static final String PRODUCT_CON = "Mobile/product-con";

    /**
     * 首页
     * */
    @RequestMapping("index")
    public ModelAndView index( ) {
        return new ModelAndView(INDEX);
    }

    /**
     * 公司简介
     * */
    @RequestMapping("company")
    public ModelAndView company( ) {
        return new ModelAndView(COMPANY);
    }

    /**
     * 公司相册
     * */
    @RequestMapping("company-pic")
    public ModelAndView companyPic( ) {
        return new ModelAndView(COMPANY_PIC);
    }

    /**
     * 联系我们
     * */
    @RequestMapping("contact")
    public ModelAndView contact( ) {
        return new ModelAndView(CONTACT);
    }

    /**
     * 新闻中心
     * */
    @RequestMapping("new-center")
    public ModelAndView newCenter( ) {
        return new ModelAndView(NEW_CENTER);
    }

    /**
     * 新闻明细
     * */
    @RequestMapping("new-center-con")
    public ModelAndView newCenterCon( ) {
        return new ModelAndView(NEW_CENTER_CON);
    }

    /**
     * 在线消息
     * */
    @RequestMapping("online-message")
    public ModelAndView onlineMessage( ) {
        return new ModelAndView(ONLINE_MESSAGE);
    }

    /**
     * 产品信息
     * */
    @RequestMapping("product")
    public ModelAndView product( ) {
        return new ModelAndView(PRODUCT);
    }

    /**
     * 产品明细
     * */
    @RequestMapping("product-con")
    public ModelAndView productCon( ) {
        return new ModelAndView(PRODUCT_CON);
    }

}
