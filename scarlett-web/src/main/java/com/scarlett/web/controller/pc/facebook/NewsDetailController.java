package com.scarlett.web.controller.pc.facebook;

import com.scarlett.bean.bo.NewsBo;
import com.scarlett.bean.constant.NewsStatusEnum;
import com.scarlett.bean.constant.NewsTypeEnum;
import com.scarlett.bean.pojo.NewsConditionPojo;
import com.scarlett.common.domain.Page;
import com.scarlett.frame.service.backstage.NewsService;
import com.scarlett.frame.service.utils.FileOperationService;
import com.scarlett.web.base.BaseController;
import com.scarlett.web.controller.pc.facebook.vo.FaceNewsResultVo;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2017/8/13.
 */
@Controller
@RequestMapping( "/news/detail" )
public class NewsDetailController extends BaseController {

    // 新闻详情
    private static final String NEWS_DETAIL = "/PC/Facebook/NewsDetail";

    @Autowired
    private NewsService newsService;

    @Autowired
    private FileOperationService fileOperationService;

    @RequestMapping( { "/{newsId}" } )
    public ModelAndView index( @PathVariable( "newsId" ) Long newsId ) {
        Assert.notNull( newsId, "id can not be null" );
        NewsBo newsBo = newsService.detail( newsId );
        String contentUrl = StringUtils.EMPTY;
        if ( newsBo != null ) {
            contentUrl = newsBo.getContentUrl( );
        }
        String newsContent = StringUtils.EMPTY;
        if ( StringUtils.isNotEmpty( contentUrl )) {
            newsContent = fileOperationService.getFileContent( contentUrl );
        }
        Map< String, Object > result = new HashMap<>( );

        FaceNewsResultVo faceNewsResultVo = new FaceNewsResultVo( );
        BeanUtils.copyProperties( newsBo, faceNewsResultVo );

        result.put( "faceNewsResultVo", faceNewsResultVo );
        result.put( "newsContent", newsContent );

        // 要闻
        List<FaceNewsResultVo> importNews = getNewsByType( NewsTypeEnum.IMPORT_NEWS, 5 );
        result.put( "importNews", importNews );

        return new ModelAndView( NEWS_DETAIL, result );
    }

    private List<FaceNewsResultVo> getNewsByType( NewsTypeEnum newsTypeEnum, Integer count ) {
        NewsConditionPojo newsCondition = new NewsConditionPojo( );
        newsCondition.setNewsStatus( NewsStatusEnum.ONLINE );
        newsCondition.setNewsTypeEnum( newsTypeEnum );
        Page<NewsBo> newsBoPage = newsService.list( newsCondition, 1, count );
        List<FaceNewsResultVo> resultVos = convertNews( newsBoPage.getResult( ));

        return resultVos;
    }

    private List<FaceNewsResultVo> convertNews( List<NewsBo> newsBos ) {
        List<FaceNewsResultVo> resultVos = new LinkedList<>( );
        if ( CollectionUtils.isEmpty( newsBos )) {
            return resultVos;
        }

        for ( NewsBo newsBo : newsBos ) {
            FaceNewsResultVo faceNewsResultVo = new FaceNewsResultVo( );
            BeanUtils.copyProperties( newsBo, faceNewsResultVo );
            resultVos.add( faceNewsResultVo );
        }

        return resultVos;
    }

}
