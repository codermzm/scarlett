package com.scarlett.bean.bo;

/**
 * Created by admin on 2017/8/26.
 */
public class VisitHistoryBo {

    private String viewName;

    private Long userId;

    private String remoteIp;

    private String popuChannel;

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRemoteIp() {
        return remoteIp;
    }

    public void setRemoteIp(String remoteIp) {
        this.remoteIp = remoteIp;
    }

    public String getPopuChannel() {
        return popuChannel;
    }

    public void setPopuChannel(String popuChannel) {
        this.popuChannel = popuChannel;
    }
}
