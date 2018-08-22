package com.scarlett.web.controller.pc.backstage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 后台管理页面管理
 * Created by admin on 2017/6/4.
 */
@Controller
@RequestMapping("/backstage")
public class BackstageRegisterController {

    // 后台主要
    private static final String HOME_VIEW = "PC/Backstage/Home";

    // 产品列表
    private static final String PRODUCT_LIST_VIEW = "PC/Backstage/ProductList";

    // 产品创建
    private static final String PRODUCT_ADD_VIEW = "PC/Backstage/ProductAdd";

    // 成功案例列表
    private static final String SUCCESSFUL_CASE_LIST_VIEW = "PC/Backstage/SuccessfulCaseList";

    // 成功案例新建
    private static final String SUCCESSFUL_CASE_ADD_VIEW = "PC/Backstage/SuccessfulCaseAdd";

    // 新闻列表
    private static final String NEWS_LIST_VIEW = "PC/Backstage/News/NewsList";

    // 新闻新建
    private static final String NEWS_DETAIL_ADD = "PC/Backstage/News/NewsAdd";

    // 新闻编辑
    private static final String NEWS_DETAIL_EDIT = "PC/Backstage/News/NewsEdit";

    // 新闻内容编辑
    private static final String NEWS_CONTENT_EDIT = "PC/Backstage/News/NewsContentEdit";

    // 新闻详情
    private static final String NEWS_DETAIL_VIEW = "PC/Backstage/News/NewsDetail";

    @RequestMapping({ "/", "/home" })
    public ModelAndView home( ) {
        return new ModelAndView( HOME_VIEW );
    }

    @RequestMapping( "/productList" )
    public ModelAndView productList( ) {
        return new ModelAndView( PRODUCT_LIST_VIEW );
    }

    @RequestMapping( "/productAdd" )
    public ModelAndView product( ) {
        return new ModelAndView( PRODUCT_ADD_VIEW );
    }

    @RequestMapping( "/successfulList" )
    public ModelAndView successfulList( ) {
        return new ModelAndView( SUCCESSFUL_CASE_LIST_VIEW );
    }

    @RequestMapping( "/successfulAdd" )
    public ModelAndView successfulAdd( ) {
        return new ModelAndView( SUCCESSFUL_CASE_LIST_VIEW );
    }

    @RequestMapping( "/newsList" )
    public ModelAndView newsList( ) {
        return new ModelAndView( NEWS_LIST_VIEW );
    }

    @RequestMapping( "/newsAdd" )
    public ModelAndView newsAdd( ) {
        return new ModelAndView( NEWS_DETAIL_ADD );
    }

    @RequestMapping( "/newsEdit" )
    public ModelAndView newsEdit( ) {
        return new ModelAndView( NEWS_DETAIL_EDIT );
    }

    @RequestMapping( "/newsDetail" )
    public ModelAndView newsDetail( ) {
        return new ModelAndView( NEWS_DETAIL_VIEW );
    }

    @RequestMapping( "/newsContent" )
    public ModelAndView newsContent( ) {
        return new ModelAndView( NEWS_CONTENT_EDIT );
    }

}
