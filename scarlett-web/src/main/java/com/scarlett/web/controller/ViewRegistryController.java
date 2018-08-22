package com.scarlett.web.controller;

import com.scarlett.web.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by admin on 2017/5/6.
 * 页面路径统一收口
 */
@Controller
@RequestMapping( "/" )
public class ViewRegistryController extends BaseController {

    // 课程列表
    private static final String LESSON_LIST = "/PC/Facebook/LessonList";

    // 课程详情
    private static final String LESSON_DETAIL = "/PC/Facebook/LessonDetail";

    // 新闻列表
    private static final String NEWS_LIST = "/PC/Facebook/NewsList";

    // 新闻详情
    private static final String NEWS_DETAIL = "/PC/Facebook/NewsDetail";

    // 用户登录
    private static final String USER_LOGIN = "/PC/Facebook/UserLogin";

    // 用户注册
    private static final String USER_REGISTER = "/PC/Facebook/LessonDetail";

    /**
     * 用户登录
     * */
    @RequestMapping("/user/login")
    public ModelAndView userLogin( ) {
        return new ModelAndView( USER_LOGIN );
    }

    /**
     * 用户注册
     * */
    @RequestMapping("/user/register")
    public ModelAndView userRegister( ) {
        return new ModelAndView( USER_REGISTER );
    }

    /**
     * 课程列表
     * */
    @RequestMapping("/lesson/list")
    public ModelAndView lessonList( Long lessonId ) {
        return new ModelAndView( LESSON_LIST );
    }

    /**
     * 课程详情
     * */
    @RequestMapping("/lesson/detail")
    public ModelAndView lessonDetail( Long lessonId ) {
        return new ModelAndView( LESSON_DETAIL );
    }

    /**
     * 课程列表
     * */
   /* @RequestMapping("/news/list")
    public ModelAndView newsList( Long newsId ) {
        return new ModelAndView( NEWS_LIST );
    }*/

    /**
     * 课程详情
     * */
    /*@RequestMapping("/news/detail")
    public ModelAndView newsDetail( Long newsId ) {
        return new ModelAndView( NEWS_DETAIL );
    }*/

}
