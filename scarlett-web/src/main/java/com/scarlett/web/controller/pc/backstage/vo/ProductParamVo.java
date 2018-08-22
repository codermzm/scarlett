package com.scarlett.web.controller.pc.backstage.vo;

/**
 * Created by admin on 2017/6/27.
 */
public class ProductParamVo {

    private String title;

    private String describe;

    private String imgMini;

    private String imgBig;

    private Integer level;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getImgMini() {
        return imgMini;
    }

    public void setImgMini(String imgMini) {
        this.imgMini = imgMini;
    }

    public String getImgBig() {
        return imgBig;
    }

    public void setImgBig(String imgBig) {
        this.imgBig = imgBig;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
