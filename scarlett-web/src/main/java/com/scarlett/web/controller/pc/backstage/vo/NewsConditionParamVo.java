package com.scarlett.web.controller.pc.backstage.vo;

import com.scarlett.bean.constant.NewsStatusEnum;
import com.scarlett.bean.constant.NewsTypeEnum;

/**
 * Created by admin on 2017/7/22.
 */
public class NewsConditionParamVo {

    /**
     * 新闻状态
     * */
    private NewsStatusEnum newsStatus;

    /**
     * 新闻类型
     * */
    private NewsTypeEnum newsTypeEnum;

    public NewsStatusEnum getNewsStatus() {
        return newsStatus;
    }

    public void setNewsStatus(NewsStatusEnum newsStatus) {
        this.newsStatus = newsStatus;
    }

    public NewsTypeEnum getNewsTypeEnum() {
        return newsTypeEnum;
    }

    public void setNewsTypeEnum(NewsTypeEnum newsTypeEnum) {
        this.newsTypeEnum = newsTypeEnum;
    }
}
