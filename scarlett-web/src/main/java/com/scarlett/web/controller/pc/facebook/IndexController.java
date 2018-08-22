package com.scarlett.web.controller.pc.facebook;

import com.scarlett.bean.bo.NewsBo;
import com.scarlett.bean.constant.NewsStatusEnum;
import com.scarlett.bean.constant.NewsTypeEnum;
import com.scarlett.bean.pojo.NewsConditionPojo;
import com.scarlett.common.domain.Page;
import com.scarlett.frame.service.backstage.NewsService;
import com.scarlett.frame.service.backstage.VisitHistoryAsyncService;
import com.scarlett.frame.service.orm.QQCustomerClient;
import com.scarlett.web.base.BaseController;
import com.scarlett.web.base.JsonResult;
import com.scarlett.web.controller.pc.facebook.vo.FaceNewsResultVo;
import com.scarlett.web.controller.pc.facebook.vo.QQCustomerResultVo;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by admin on 2017/7/31.
 */
@Controller
@RequestMapping( "/" )
public class IndexController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger( IndexController.class );

    // 首页
    private static final String INDEX_VIEW = "/PC/Facebook/Index";

    private static final  List<String> QQ_NUMS = Arrays.asList( );

    @Autowired
    private NewsService newsService;

    @Autowired
    private QQCustomerClient qqCustomerClient;

    @Autowired
    private VisitHistoryAsyncService visitHistoryAsyncService;

    /**
     * 首页
     * */
    @RequestMapping( { "/" ,"index" } )
    public ModelAndView index( HttpServletRequest httpServletRequest ) {

        Map<String, Object> models = new HashMap<>( );

        // 在线咨询
        models.put( "qqNumbers", QQ_NUMS );

        // 要闻
        List<FaceNewsResultVo> importNews = getNewsByType( NewsTypeEnum.IMPORT_NEWS, 5 );
        models.put( "importNews", importNews );

        // XXX咨询
        List<FaceNewsResultVo> kaoYanZiXunNews = getNewsByType( NewsTypeEnum.KAO_YAN_ZI_XUN_NEWS, 10 );
        models.put( "kaoYanZiXunNews", kaoYanZiXunNews );

        // 机构咨询
        List<FaceNewsResultVo> jiGouZiXunNews = getNewsByType( NewsTypeEnum.JI_GOU_ZI_XUN_NEWS, 10 );
        models.put( "jiGouZiXunNews", jiGouZiXunNews );

        // 公共课资料
        List<FaceNewsResultVo> gongGongZiLiao = getNewsByType( NewsTypeEnum.GONG_GONG_KE_ZI_LIAO, 6 );
        models.put( "gongGongZiLiao", gongGongZiLiao );

        // 英语
        List<FaceNewsResultVo> yingYuZiLiao = getNewsByType( NewsTypeEnum.YING_YU_ZI_LIAO, 9 );
        models.put( "yingYuZiLiao", yingYuZiLiao );

        // 数学
        List<FaceNewsResultVo> shuXueZiLiao = getNewsByType( NewsTypeEnum.SHU_XUE_ZI_LIAO, 9 );
        models.put( "shuXueZiLiao", shuXueZiLiao );

        // 政治
        List<FaceNewsResultVo> zhengZhiZiLiao = getNewsByType( NewsTypeEnum.ZHENG_ZHI_ZI_LIAO, 9 );
        models.put( "zhengZhiZiLiao", zhengZhiZiLiao );

        // 真题资料
        List<FaceNewsResultVo> zhengTiZiLiao = getNewsByType( NewsTypeEnum.ZHEN_TI_ZI_LIAO, 7 );
        models.put( "zhengTiZiLiao", zhengTiZiLiao );

        List<FaceNewsResultVo> daGangZiLiao = getNewsByType( NewsTypeEnum.DA_GANG_ZI_LIAO, 3 );
        models.put( "daGangZiLiao", daGangZiLiao );

        // 调剂分数线
        List<FaceNewsResultVo> tiaoJiLine = getNewsByType( NewsTypeEnum.TIAO_JI_LINE_NEWS, 34 );
        models.put( "tiaoJiLine", tiaoJiLine );

        // 复试新闻
        List<FaceNewsResultVo> fuShiNews = getNewsByType( NewsTypeEnum.FU_SHI_NEWS, 12 );
        models.put( "fuShiNews", fuShiNews );

        // 复试新闻
        List<FaceNewsResultVo> tiaoJiNews = getNewsByType( NewsTypeEnum.TIAO_JI_NEWS, 12 );
        models.put( "tiaoJiNews", tiaoJiNews );

        // 记录来访者
        visitHistoryAsyncService.insertVisit( httpServletRequest );

        return new ModelAndView( INDEX_VIEW, models );
    }

    /**
     * 获取qq客服
     * */
    @ResponseBody
    @RequestMapping("index/getQQCustomer")
    public JsonResult<List<QQCustomerResultVo>> getQQCustomer( ) {
        List<QQCustomerResultVo> result = new ArrayList<>( );
        Map< String, Boolean > isOnlineMap = qqCustomerClient.qqIsOnline( QQ_NUMS );
        if ( MapUtils.isEmpty( isOnlineMap )) {
            logger.error( "qq result can not be empty" );
            return error( result );
        }

        Set<Map.Entry< String, Boolean >> entitys = isOnlineMap.entrySet( );
        for ( Map.Entry< String, Boolean > entity : entitys ) {
            String qqNumber = entity.getKey( );
            Boolean isOnline = entity.getValue( );

            QQCustomerResultVo qqCustomerResultVo = new QQCustomerResultVo( );
            qqCustomerResultVo.setQqNumber( qqNumber );
            qqCustomerResultVo.setOnline( isOnline );

            result.add( qqCustomerResultVo );
        }

        return success( result );
    }

    private List<FaceNewsResultVo> getNewsByType( NewsTypeEnum newsTypeEnum, Integer count ) {
        NewsConditionPojo newsCondition = new NewsConditionPojo( );
        newsCondition.setNewsTypeEnum( newsTypeEnum );
        newsCondition.setNewsStatus( NewsStatusEnum.ONLINE );
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
