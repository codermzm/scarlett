package com.scarlett.web.controller.pc.facebook.vo;

/**
 * Created by admin on 2017/8/6.
 */
public class QQCustomerResultVo {

    private String qqNumber;

    private Boolean online;

    private String qqTitle;

    public String getQqNumber() {
        return qqNumber;
    }

    public void setQqNumber(String qqNumber) {
        this.qqNumber = qqNumber;
    }

    public Boolean getOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public String getQqTitle() {return qqTitle;}

    public void setQqTitle(String qqTitle) {this.qqTitle = qqTitle;}
}
