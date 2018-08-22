package com.scarlett.web.controller.pc.backstage;

import com.scarlett.bean.bo.NewsBo;
import com.scarlett.bean.constant.NewsTypeEnum;
import com.scarlett.bean.pojo.NewsConditionPojo;
import com.scarlett.common.domain.Page;
import com.scarlett.frame.service.backstage.NewsService;
import com.scarlett.frame.service.utils.FileOperationService;
import com.scarlett.web.base.BaseController;
import com.scarlett.web.base.JsonResult;
import com.scarlett.web.controller.pc.backstage.vo.NewsConditionParamVo;
import com.scarlett.web.controller.pc.backstage.vo.NewsParamVo;
import com.scarlett.web.controller.pc.backstage.vo.NewsResultVo;
import com.scarlett.web.exception.ParamValidationException;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by admin on 2017/7/22.
 */
@Controller
@RequestMapping("/backstage/news")
public class NewsManagerController extends BaseController {

    @Autowired
    private NewsService newsService;

    @Autowired
    private FileOperationService fileOperationService;

    @ResponseBody
    @RequestMapping("/list")
    public JsonResult<Page<NewsResultVo>> list( @RequestParam( value = "pageNumber", defaultValue = "1" ) Integer currentPage,
                                     @RequestParam( value = "pageSize", defaultValue = "10" ) Integer pageSize,
                                    NewsConditionParamVo newsConditionParamVo ) {
        NewsConditionPojo newsConditionPojo = new NewsConditionPojo( );
        if ( newsConditionParamVo != null ) {
            BeanUtils.copyProperties( newsConditionParamVo, newsConditionPojo );
        }
        Page<NewsBo> pageBo = newsService.list( newsConditionPojo, currentPage, pageSize );
        List<NewsResultVo> newsResultVos = new LinkedList<>( );
        if (CollectionUtils.isNotEmpty( pageBo.getResult( ))) {
            for ( NewsBo newsBo :pageBo.getResult( )) {
                NewsResultVo newsResultVo = new NewsResultVo( );
                BeanUtils.copyProperties( newsBo, newsResultVo );
                newsResultVos.add( newsResultVo );
            }
        }

        Page<NewsResultVo> pageVo = new Page<>( );
        pageVo.setPageNo( pageBo.getPageNo( ));
        pageVo.setPageSize( pageBo.getPageSize( ));
        pageVo.setTotalCount( pageBo.getTotalCount( ));
        pageVo.setResult( newsResultVos );

        return super.success( pageVo );
    }

    @ResponseBody
    @RequestMapping("/add")
    public JsonResult<Object> add( NewsParamVo newsParamVo ) {
        Assert.notNull( newsParamVo, "param can not be null" );
        Assert.notNull( newsParamVo.getType( ), "type can not be empty" );
        Assert.notNull( newsParamVo.getNewsTime( ), "newsTime can not be null" );
        if ( StringUtils.isEmpty( newsParamVo.getTitle( ))) {
            throw new ParamValidationException( "title", "title can not be empty" );
        }
        NewsTypeEnum newsTypeEnum = NewsTypeEnum.valueOf( newsParamVo.getType( ));
        if ( newsTypeEnum == null ) {
            throw new ParamValidationException( "newsType", "新闻类型不正确" );
        }

        NewsBo newsBo = new NewsBo( );
        BeanUtils.copyProperties( newsParamVo, newsBo );

        Boolean result = newsService.add( newsBo );

        return result == true ? super.success( ) : super.error( );
    }

    @ResponseBody
    @RequestMapping("/update")
    public JsonResult<Object> update( Long id, NewsParamVo newsParamVo ) {
        Assert.notNull( newsParamVo, "param can not be null" );
        Assert.notNull( newsParamVo.getType( ), "type can not be empty" );
        Assert.notNull( newsParamVo.getNewsTime( ), "newsTime can not be null" );
        if ( StringUtils.isEmpty( newsParamVo.getTitle( ))) {
            throw new ParamValidationException( "title", "title can not be empty" );
        }
        NewsBo newsBo = new NewsBo( );
        BeanUtils.copyProperties( newsParamVo, newsBo );
        newsBo.setId( id );

        Boolean result = newsService.update( newsBo );

        return result == true ? super.success( ) : super.error( );
    }

    @ResponseBody
    @RequestMapping( "/saveContent" )
    public JsonResult<Object> saveContent( Long id, String content ) throws IOException {
        Assert.notNull( id, "id can not be null" );
        Assert.isTrue( StringUtils.isNotEmpty( content ), "content can not be empty" );

        Boolean b = newsService.saveContent( id, content );

        return b == true ? super.success( ) : super.error( );
    }

    @ResponseBody
    @RequestMapping( "/getContent" )
    public JsonResult<String> getContent( Long id ) {
        Assert.notNull( id, "id can not be null" );
        NewsBo newsBo = newsService.detail( id );
        String contentUrl = newsBo.getContentUrl( );

        String result = StringUtils.EMPTY;
        if ( StringUtils.isNotEmpty( contentUrl )) {
            result = fileOperationService.getFileContent( contentUrl );
        }
        return success( "ok", result );
    }

    @ResponseBody
    @RequestMapping("/detail")
    public JsonResult<NewsResultVo> detail( Long newsId ) {
        Assert.notNull( newsId, "newsId name can not be null" );

        NewsBo newsBo = newsService.detail( newsId );
        NewsResultVo result = new NewsResultVo( );
        BeanUtils.copyProperties( newsBo, result );

        return super.success( result );
    }

    @ResponseBody
    @RequestMapping("/examine")
    public JsonResult<Boolean> examine( Long newsId, Boolean status ) {
        Assert.notNull( status, "status can not be null" );
        Assert.notNull( newsId, "newsId name can not be null" );

        Boolean result  = newsService.examine( newsId, status );

        return super.success( result );
    }

    @ResponseBody
    @RequestMapping("/close")
    public JsonResult<Boolean> close( Long newsId ) {
        Assert.notNull( newsId, "newsId name can not be null" );

        Boolean result  = newsService.close( newsId );

        return super.success( result );
    }


}
