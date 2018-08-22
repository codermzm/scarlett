package com.scarlett.bean.pojo;

import com.scarlett.bean.constant.NewsStatusEnum;
import com.scarlett.bean.constant.NewsTypeEnum;

/**
 * Created by admin on 2017/7/21.
 */
public class NewsConditionPojo {

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
