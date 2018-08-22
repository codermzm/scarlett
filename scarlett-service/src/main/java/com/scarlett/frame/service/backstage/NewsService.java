package com.scarlett.frame.service.backstage;

import com.scarlett.bean.bo.NewsBo;
import com.scarlett.bean.pojo.NewsConditionPojo;
import com.scarlett.common.domain.Page;

import java.io.IOException;

/**
 * Created by admin on 2017/7/21.
 */
public interface NewsService {

    /**
     * 列表展示
     * */
    Page<NewsBo> list( NewsConditionPojo newsConditionPojo, Integer currentPage, Integer pageSize );

    /**
     * 创建新闻
     * */
    Boolean add( NewsBo newsBo );

    /**
     * 修改新闻
     * */
    Boolean update( NewsBo newsBo );

    /**
     * 保存新闻内容
     * */
    Boolean saveContent( Long id, String content ) throws IOException;

    /**
     * 新闻详情
     * */
    NewsBo detail( Long id );

    /**
     * 审核
     * @param id 新闻Id
     * @param status 审核状态 true 通过 false 不通过
     * @return 操作是否成功
     * */
    Boolean examine( Long id, Boolean status );


    /**
     * 关闭新闻
     * @param id 新闻Id
     * @return 执行状态
     * */
    Boolean close( Long id );
}
